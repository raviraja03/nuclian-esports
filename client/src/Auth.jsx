import { Navigate, Outlet } from "react-router-dom";

const Auth = ({ user, redirect = "/", onlyPublic = false, children }) => {
  if (!onlyPublic && !user) return <Navigate to={redirect} replace />;

  if (onlyPublic && user) return <Navigate to={redirect} replace />;

  return children ? children : <Outlet />;
};

export default Auth;
