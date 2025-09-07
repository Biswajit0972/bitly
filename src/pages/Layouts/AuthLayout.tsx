import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="h-dvh w-full relative px-2 bg-black">
            <div className="relative h-full w-full  items-center">
                <Outlet/>
            </div>
        </div>
    )
}
export default AuthLayout
