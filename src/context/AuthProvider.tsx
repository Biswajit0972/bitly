import {AuthContext} from "./Auth.ts";
import {type ReactNode, useEffect, useState} from "react";
import {getTokens} from "../utils/helpers/warrperRouter.ts";

const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    useEffect(() => {
        const {isTokenAvailable} = getTokens();
        console.log(isTokenAvailable)

        setIsLoggedIn(isTokenAvailable);
    }, []);

    useEffect(() => {
        const {isTokenAvailable} = getTokens();
        if (isTokenAvailable) {
            setIsLoggedIn(isTokenAvailable);
        } else {
            setIsLoggedIn(false);
        }
    }, [isLoggedIn])
    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>{
            children
        }</AuthContext.Provider>
    )
}
export default AuthProvider
