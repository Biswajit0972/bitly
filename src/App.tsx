import AuthLayout from "./pages/Layouts/AuthLayout.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/login.tsx";
import Signup from "./pages/Signup.tsx";
import NotFound from "./pages/Error.tsx";
import Authentication from "./components/Authentication.tsx";
import HomeLayout from "./pages/Layouts/HomeLayout.tsx";
import QueryProvider from "./query/QueryProvider.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Authentication,
        children: [
            {
                Component: AuthLayout,
                children: [
                    {index: true, Component: Login},
                    {path: "login", Component: Login},
                    {path: "signup", Component: Signup},
                    {path: "*", Component: NotFound}
                ]
            },
            {
                path: "/home",
                Component: HomeLayout,
                children: []
            }
        ]
    }
]);

const App = () => {
    return <QueryProvider>
        <RouterProvider router={router}/>
    </QueryProvider>;
};

export default App;
