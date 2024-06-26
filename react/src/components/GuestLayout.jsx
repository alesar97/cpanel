import { Navigate, Outlet } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {
    const { userToken } = UseStateContext();

    if (userToken) {
        return <Navigate to="/" />;
    }
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto"
                        src="/logo.png"
                        alt="Your Company"
                    />
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
