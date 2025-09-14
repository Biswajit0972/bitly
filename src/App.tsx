import AuthLayout from "./pages/Layouts/AuthLayout.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/login.tsx";
import Signup from "./pages/Signup.tsx";
import NotFound from "./pages/Error.tsx";
import Authentication from "./components/Authentication.tsx";
import HomeLayout from "./pages/Layouts/HomeLayout.tsx";
import QueryProvider from "./query/QueryProvider.tsx";
import Home from "./pages/Home.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import Pricing from "./pages/Pricing.tsx";
import About from "./pages/About.tsx";
import Dashboard from "./pages/Layouts/Dashboard.tsx";
import GetLinks from "./pages/GetLinks.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Authentication,
        children: [
            {
                Component: HomeLayout,
                children: [
                    {index: true, Component: Home},
                    {path: "/home", Component: Home},
                    {path: "/pricing", Component: Pricing},
                    {path: "/about", Component: About},
                    {
                        path: "/dashboard", Component: Dashboard,
                        children: [
                            {index: true, Component: GetLinks},
                            {path: "/dashboard/getLinks", Component: GetLinks}
                        ]
                    }
                ]
            },
            {
                path: "/auth",
                Component: AuthLayout,
                children: [
                    {index: true, Component: Login},
                    {path: "login", Component: Login},
                    {path: "signup", Component: Signup},

                ]
            },
            {path: "*", Component: NotFound}
        ]
    }
]);

const App = () => {
    return <QueryProvider>
        <AuthProvider>


            <RouterProvider router={router}/>
        </AuthProvider>
    </QueryProvider>;
};

export default App;
