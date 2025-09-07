import AuthLayout from "./pages/Layouts/AuthLayout.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/login.tsx";
import Signup from "./pages/Signup.tsx";
import NotFound from "./pages/Error.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: "signup",
                Component: Signup
            },
            {index: true, Component: Login},
            {
                path: "*",
                Component: NotFound
            }
        ]
    },

])
const App = () => {
    return (
        <RouterProvider router={router}/>
    )
}
export default App
