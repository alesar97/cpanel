import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import AddDish from "./views/AddDish";
import Users from "./views/Users";
import Dishes from "./views/Dishes";
import Orders from "./views/Orders";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Navigate to="/" />,
            },
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/add-dish",
                element: <AddDish key="dishCreate" />,
            },
            {
                path: "/dish/:id",
                element: <AddDish key="dishUpdate" />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/dishes",
                element: <Dishes />,
            },
            {
                path: "/orders",
                element: <Orders />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
