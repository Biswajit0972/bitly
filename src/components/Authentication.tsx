import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getTokens } from "../utils/helpers/warrperRouter.ts";

const Authentication = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isTokenAvailable } = getTokens();
    console.log(isTokenAvailable)

    useEffect(() => {

    if (!isTokenAvailable && pathname !== "/login" && pathname !== "/signup") {
      navigate("/login", { replace: true });
      return;
    }

    if (isTokenAvailable && (pathname === "/login" || pathname === "/signup" || pathname === "/")) {
      navigate("/home", { replace: true });
    }
  }, [isTokenAvailable, pathname, navigate]);

  return <Outlet />;
};

export default Authentication;
