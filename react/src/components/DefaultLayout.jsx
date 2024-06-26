import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import { Bars3Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const { currentUser, userToken, setCurrentUser, setUserToken } =
        UseStateContext();

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setCurrentUser(data);
        });
    }, []);

    if (!userToken) {
        return <Navigate to="login" />;
    }

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setCurrentUser({});
            setUserToken(null);
        });
    };

    const navigation = [
        { name: "Dashboard", to: "/dashboard" },
        { name: "Users", to: "/users" },
        { name: "Dishes", to: "/dishes" },
        { name: "Add a Dish", to: "/add-dish" },
        { name: "Orders", to: "/orders" },
    ];

    const userNavigation = [
        { name: "Your Profile", href: "#" },
        { name: "Sign out", href: "#", onClick: logout },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-500">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="mx-auto h-10 w-auto"
                                                src="/logo.png"
                                                alt="Your Company"
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <NavLink
                                                        key={item.name}
                                                        to={item.to}
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            classNames(
                                                                isActive
                                                                    ? "bg-gray-600 text-white"
                                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                                "rounded-md px-3 py-2 text-sm font-medium"
                                                            )
                                                        }
                                                    >
                                                        {item.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            {/* Profile dropdown */}
                                            <Menu
                                                as="div"
                                                className="relative ml-3"
                                            >
                                                <div>
                                                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-500 text-sm focus:outline-none">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">
                                                            Open user menu
                                                        </span>
                                                        <p className="text-white pr-3">
                                                            {currentUser.name}
                                                        </p>
                                                        <UserIcon className="w-8 h-8 text-white bg-gray-600 rounded-full p-2" />
                                                    </MenuButton>
                                                </div>
                                                <Transition
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map(
                                                            (item) => (
                                                                <MenuItem
                                                                    key={
                                                                        item.name
                                                                    }
                                                                >
                                                                    {({
                                                                        focus,
                                                                    }) => (
                                                                        <a
                                                                            href={
                                                                                item.href
                                                                            }
                                                                            onClick={
                                                                                item.onClick
                                                                            }
                                                                            className={classNames(
                                                                                focus
                                                                                    ? "bg-gray-100"
                                                                                    : "",
                                                                                "block px-4 py-2 text-sm text-gray-700"
                                                                            )}
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </a>
                                                                    )}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </MenuItems>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">
                                                Open main menu
                                            </span>
                                            {open ? (
                                                <XMarkIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <Bars3Icon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </DisclosureButton>
                                    </div>
                                </div>
                            </div>

                            <DisclosurePanel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.to}
                                            className={({ isActive }) =>
                                                classNames(
                                                    isActive
                                                        ? "bg-gray-600 text-white"
                                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                    "block rounded-md px-3 py-2 text-base font-medium"
                                                )
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                                <div className="border-t border-gray-500 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <UserIcon className="w-8 h-8 text-white bg-gray-600 rounded-full p-2" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">
                                                {currentUser.name}
                                            </div>
                                            <div className="text-sm font-medium leading-none text-gray-400">
                                                {currentUser.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                href={item.href}
                                                onClick={item.onClick}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </DisclosurePanel>
                        </>
                    )}
                </Disclosure>

                {/* <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Dashboard
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"> */}
                <Outlet />
                {/* </div>
                </main> */}
            </div>
        </>
    );
}
