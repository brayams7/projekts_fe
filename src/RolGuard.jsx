import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes } from "./routes";

// eslint-disable-next-line react/prop-types
const RolGuard = ({roles=[]}) => {
  const auth = useSelector(state => state.auth)
  const { rol } = auth

  return roles.includes(rol.name) ? <Outlet/> : <Navigate to={PrivateRoutes.PRIVATE_HOME} replace/>;
};

export default RolGuard;
