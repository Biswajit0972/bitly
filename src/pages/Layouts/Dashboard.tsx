import Header from "../../components/DashBoard/Header.tsx";
import {Outlet} from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="relative h-full w-full overflow-hidden">
            <section className="w-full h-full">
                {/*<SideBar/>*/}
                <Header/>
                <main className="h-[calc(100%-48px)] w-full overflow-y-auto relative">
                    <Outlet/>
                </main>
            </section>
        </div>
    )
}
export default Dashboard;
