import { Outlet} from "react-router-dom";
import Header from "../../components/Header.tsx";
import {Bounce, ToastContainer} from "react-toastify";

const HomeLayout = () => {
    return (
        <div className=" h-dvh min-h-screen  w-full min-w-screen grid grid-cols-5 grid-rows-11 bg-black">
            <header className="col-span-5 bg-black">
                <Header/>
            </header>
            <div className="col-span-5 row-span-9 col-start-1 row-start-2 bg-blue-500 relative overflow-x-hidden overflow-y-auto">
                <Outlet/>
            </div>
            <footer className="col-span-5 relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:flex sm:items-center sm:justify-center h-full relative">
                    <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/60 sm:flex-row  sm:text-[18px] w-full relative">
                        <p>&copy; {new Date().getFullYear()} Linkly. All rights reserved.</p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="hover:text-white">Privacy</a>
                            <a href="#" className="hover:text-white">Terms</a>
                            <a href="#" className="hover:text-white">Status</a>
                        </div>
                    </div>
                </div>
            </footer>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </div>

    )
}
export default HomeLayout
