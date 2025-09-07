import Login from "../login.tsx";

const AuthLayout = () => {
    return (
        <div className="h-dvh w-full relative px-2 bg-black">
            <div className="relative h-full w-full  items-center">
                <Login/>
            </div>
        </div>
    )
}
export default AuthLayout
