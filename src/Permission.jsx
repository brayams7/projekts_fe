import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Permission = ({permission, component:Component}) => {

  const auth = useSelector(state => state.auth)
  const { permissions } = auth

  const hasPermission = permissions.find((per)=> per.name.includes(permission))

  if(Component && hasPermission !== undefined) return <Component/>

  if(hasPermission !== undefined) return <Outlet/>

  return <h1>Page not found</h1>
};

export default Permission;
