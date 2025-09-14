import {AuthContext} from "./Auth.ts";
import {type ReactNode, useEffect, useState} from "react";
import {getTokens} from "../utils/helpers/warrperRouter.ts";
import {revalidateToken} from "../query/functions/authentication.ts";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";

const AuthProvider = ({children}: { children: ReactNode }) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const {isPending, data, isError, error} = useQuery({
        queryKey: ["revalidateToken"],
        queryFn: revalidateToken,
        enabled: isLoggedIn,
    });

    if (isError) {
        console.log(error)
        toast.error(error?.message)
    }

    if (!isPending) {
        console.log(data)
    }

    useEffect(() => {
        const {isTokenAvailable} = getTokens();
        setIsLoggedIn(isTokenAvailable);
    }, []);

    useEffect(() => {
        const {isTokenAvailable} = getTokens();
        if (isTokenAvailable) {
            setIsLoggedIn(isTokenAvailable);
        } else {
            setIsLoggedIn(false);
        }
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>{
            children
        }</AuthContext.Provider>
    )
}
export default AuthProvider
