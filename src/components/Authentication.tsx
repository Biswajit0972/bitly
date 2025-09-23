import {useCallback, useEffect, useMemo} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useTokenValidationHook} from "../query/hooks/queryHooks.ts";
import {getTokens} from "../utils/helpers/warrperRouter.ts";
import {useAuth} from "../context/Auth.ts";


const Authentication = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {setIsLoggedIn} = useAuth();

    const {mutateAsync} = useTokenValidationHook();

    const {isTokenAvailable} = getTokens();


    const tokenUpdateFn = useCallback(async () => {
        return await mutateAsync();
    }, [mutateAsync]);

    const publicRoutes = useMemo(() => ["/auth/login", "/auth/signup", "/pricing", "/about", "/home", "/"], []);

    const isPublic = useMemo(() => {
        const normalize = (s: string) => (s.endsWith("/") && s !== "/" ? s.slice(0, -1) : s);

        const path = normalize(pathname);

        return publicRoutes.some((route) => {
            const r = normalize(route);
            if (r === "/") return path === "/";
            if (path === r) return true;
            return path.startsWith(r + "/");
        });
    }, [pathname, publicRoutes]);


    useEffect(() => {
        if (isTokenAvailable && (pathname === "/auth/login" || pathname === "/auth/signup")) {
            navigate("/");
        } else if (!isTokenAvailable && !isPublic) {
            navigate("/auth/login");
        }
    }, [pathname, publicRoutes, navigate, isPublic, isTokenAvailable]);

    useEffect(() => {
        const timerId = setInterval(async () => {
            try {
                const res = await tokenUpdateFn();
                localStorage.setItem("Token", res.data.accessToken);
                setIsLoggedIn(true);
            } catch (e) {
                setIsLoggedIn(false);
                if (e === "401") {
                    if (pathname === "/auth/login" || pathname === "/auth/signup") {
                        return;
                    }
                    navigate("/");
                    return;
                }
                navigate("/auth/login");
                console.log(e)
            }
        }, 10000);
        return () => clearInterval(timerId);
    }, [tokenUpdateFn, navigate, setIsLoggedIn,  pathname]);

    return <Outlet/>;
};

export default Authentication;
