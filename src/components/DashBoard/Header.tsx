import {Link} from "react-router-dom";
import {
    ChartBar,
    HeartHandshake,
    LayoutDashboard,
    Sidebar,
    Sparkles,
    Target,
    User2
} from "lucide-react";
import {Button} from "../Button.tsx";
import React from "react";
import List from "../List.tsx";
import {dashBoardLinks} from "../../utils";


const Header = () => {
    return (
        <div className="w-full h-12 bg-gray-900">
            <div className=" h-full mx-auto max-w-7xl flex-between px-4 sm:px-6 lg:px-8">
                <Link to="/dashboard">
                    <h1 className="text-white text-xl font-bold flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5" aria-hidden="true"/>
                        Welcome to DashBoard
                    </h1>
                </Link>
                <Button variant="secondary" size="icon" className="md:hidden">
                    <Sidebar/>
                </Button>
                <nav className="hidden md:flex items-center ">
                    <List data={dashBoardLinks} render={(item) => {
                        return <Link to={item.to}
                                     className="text-sm text-white/80 hover:text-white transition-colors capitalize">
                            <div className="flex items-center gap-2">
                                {
                                    getIcon(item.icon)
                                }
                                {item.title}
                            </div>
                        </Link>
                    }} className="flex-center gap-6"/>
                </nav>
            </div>

        </div>
    )
}

function getIcon(
    key: "link" | "chart-pie" | "profile" | "heart" | "Target"
): React.ReactNode {
    switch (key) {
        case "link":
            return <Target className="h-5 w-5 text-yellow-300"/>;
        case "chart-pie":
            return <ChartBar className="h-5 w-5 text-sky-300"/>;
        case "profile":
            return <User2 className="h-5 w-5 text-emerald-300"/>;
        case "heart" :
            return <HeartHandshake className="h-4 w-4 text-pink-300"/>
        case "Target":
            return <Target className="h-5 w-5 text-yellow-300"/>;
        default:
            return <Sparkles className="h-5 w-5 text-yellow-300"/>;
    }
}

export default Header
