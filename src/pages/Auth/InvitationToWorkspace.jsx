import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../routes";

import CubeLoading  from '../../assets/loadings/CubeLoading75px.svg'
import { useAcceptInvitationOfTheWorkspaceMutation } from "../../rtkQuery/apiSliceWorkspace";

const InvitationToWorkspace = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [acceptInvitationRequest, {isError}] = useAcceptInvitationOfTheWorkspaceMutation()

  const queryParams = new URLSearchParams(location.search)

  const email = queryParams.get('email')
  const token = queryParams.get('token')


  useEffect(()=>{

    const handleInvitationRequest = async ()=>{
      try {

        const body = {
          email,
          token
        }
        const request = await acceptInvitationRequest({body}).unwrap()
        if(request.code === 200){

          const { response } = request
          if(response.is_register_user && response.is_add_user){
            navigate(`/${PublicRoutes.LOGIN}`)
          }else{
            navigate(`/${PublicRoutes.LOGIN}`)
          }

        }

      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }

    if(token && email){
      handleInvitationRequest()
    }

  },[token, email, acceptInvitationRequest, navigate])


  if(!email || !token){
    return (
      <Navigate replace={true} to={PublicRoutes.LOGIN}/>
    )
  }

  if(isError){
    return (
      <div style={{minHeight:'100vh'}} className="pt-2 h-100 d-flex flex-column text-center justify-content-center align-items-center">
          <span className="fs-5">UPS... pagina no encontrada</span>
      </div>
    )
  }

  if(loading){
    return(
      <div style={{minHeight:'100vh'}} className="pt-2 h-100 d-flex flex-column text-center justify-content-center align-items-center">
          <img src={CubeLoading} alt="loadin cube"/>
          <span className="fs-5">Cargando...</span>
      </div>
    )
  }

  return (
    <></>
  )
};

export default InvitationToWorkspace;
