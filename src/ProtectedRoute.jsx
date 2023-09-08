import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { PublicRoutes } from './routes';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = () => {
  const auth = useSelector(state => state.auth)
  const { token } = auth
  if(token?.token){
    return <Outlet/>
    // if(privateValidation)

    // else return <Navigate replace={true} to={PrivateRoutes.PRIVATE}/>

  }else{
    return (
      <Navigate replace={true} to={PublicRoutes.LOGIN}/>
    )
  }
};

export default ProtectedRoute;
