import { useCallback, useEffect, useState } from "react";
import {getTokens} from "../helpers/warrperRouter.ts";


type UseAuthStatus = {
    loggedIn: boolean;
    refresh: () => void;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useAuthStatus(): UseAuthStatus {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const refresh = useCallback(() => {
        const { isTokenAvailable } = getTokens();
        setLoggedIn(isTokenAvailable);
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);


    useEffect(() => {

        const onStorage = (e: StorageEvent) => {
            if (!e.key || e.key.toLowerCase().includes("token")) {
                refresh();
            }
        };

        const onVisibility = () => {
            if (document.visibilityState === "visible") {
                refresh();
            }
        };

        window.addEventListener("storage", onStorage);
        document.addEventListener("visibilitychange", onVisibility);
        return () => {
            window.removeEventListener("storage", onStorage);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [refresh]);

    return { loggedIn, refresh, setLoggedIn };
}