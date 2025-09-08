import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getTokens } from "../utils/helpers/warrperRouter.ts";

const Authentication = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isTokenAvailable } = getTokens();
    console.log(isTokenAvailable)

    useEffect(() => {

    // if (!isTokenAvailable && pathname !== "/login" && pathname !== "/signup") {
    //   navigate("/auth/login", { replace: true });
    //   return;
    // }

    if (isTokenAvailable && (pathname === "/auth/login" || pathname === "/auth/signup" )) {
      navigate("/", { replace: true });
    }

  }, [isTokenAvailable, pathname, navigate]);

  return <Outlet />;
};

export default Authentication;
