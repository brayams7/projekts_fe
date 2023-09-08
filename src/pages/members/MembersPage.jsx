import { NavLink, Outlet, useParams } from "react-router-dom";
import { useGetWorkspaceByIDQuery } from "../../rtkQuery/apiSliceWorkspace";
import { AvatarWithTextLoader, RectangleLoader } from "../../components/utilsComponents/MySkeleton";
import WorkspaceTitle from "../../components/worspace/workspaceTitle/WorkspaceTitle";
import { PrivateActionsRoutes } from "../../routes";

import './membersStyle.css'

const MembersPage = () => {
  const { workspaceId } = useParams()
  const {isLoading, data, isError, currentData, isFetching} = useGetWorkspaceByIDQuery(workspaceId)

  if (isLoading && !currentData) {
    return (
      <div className="d-flex flex-column gap-2 gap-md-0 flex-md-row justify-content-center align-items-md-center contianerListWorkspaces fw-bold mb-4">
        <AvatarWithTextLoader height={100}/>
        <RectangleLoader width={300}/>
      </div>
    )
  }

  if(isError){
    <p>Ocurrio un error</p>
  }

  return (
    <div className="m-4">
      <div className={isFetching ? "mb-4 is-fetching":"mb-4"}>
        {
          data?.id &&(
            <WorkspaceTitle
              isFetching={isFetching}
              color={data.color}
              name={data.name}
              description={data.description}
              workspaceId={data.id}
              userId={data.user_id}
              initials={data.initials}
            />
          )
        }
      </div>
      <hr className="m-auto mb-4"/>

      <div className="row align-items-start">
        <div
          className="col-12 col-md-3"
        >
          <span className="font-weight-600 blue-dark-color" style={{fontSize:22}}>
            Miembros
          </span>
          <nav className="nav flex-column gap-2 container-nav-members">
            <NavLink  className="nav-link" to={``} end>Miembros del espacio de trabajo</NavLink>
            <NavLink className="nav-link" to={`${PrivateActionsRoutes.MEMBERS.PENDING}`} end>Pendiente</NavLink>
          </nav>
        </div>
        <div
          className="col-12 col-md-9"
        >
          <div className="fade show">

            <Outlet
              context={
                {
                  workspaceId,
                  data
                }
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;
