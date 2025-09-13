import {Link} from "react-router-dom";
import {Link2} from "lucide-react";
import {basicNavigationLink} from "../utils";
import List from "./List.tsx";
import {useEffect, useState} from "react";
import {getTokens} from "../utils/helpers/warrperRouter.ts";
import {Button} from "./Button.tsx";

const Header = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    useEffect(() => {
    const {isTokenAvailable} = getTokens();
        if (isTokenAvailable) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [loggedIn]);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between ">
                <Link to="/" className="flex items-center gap-2 ">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white text-black">
                        <Link2 className="h-5 w-5"/>
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-white">Linkly</span>
                </Link>

                <nav className="hidden md:block w-[23%] relative ">
                    <List className=" items-center gap-6 md:flex " data={basicNavigationLink}
                          render={(item) => <li className="relative" key={item}>
                              <Link to={item}
                                    className="text-sm text-white/80 hover:text-white transition-colors capitalize">
                                  {
                                      item.split("#")[1]
                                  }
                              </Link>
                          </li>}/>
                </nav>

                {
                    !loggedIn ? (<div className="flex items-center gap-3">
                        <Link to="/auth/login"
                              className="hidden rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:text-white md:inline-block">
                            Log in
                        </Link>
                        <Link to="/auth/signup"
                              className="rounded-md bg-white px-3.5 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90">
                            Sign up
                        </Link>
                    </div>) : <Button variant="destructive" onClick={() => {
                        localStorage.removeItem("Token");
                        setLoggedIn(false);
                    }}>Logout</Button>
                }
            </div>
        </div>
    )
}
export default Header
