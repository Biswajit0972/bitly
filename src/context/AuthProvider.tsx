import {AuthContext} from "./Auth.ts";
import {type ReactNode, useState} from "react";


const AuthProvider = ({children}: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>{
            children
        }</AuthContext.Provider>
    )
}
export default AuthProvider
