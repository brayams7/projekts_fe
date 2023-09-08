import { Navigate, Route, useParams } from "react-router-dom";
import RoutesWithNotFound from "./RoutesWithNotFound";
import { PrivateActionsRoutes, PrivateRoutes } from "../routes";
import WorkspacePage from "../pages/Workpace/WorkspacePage";
import LayoutGeneral from "../components/layout/GeneralLayout/LayoutGeneral";
import { typesMenu } from "../Menu";
import { useGetWorkspaceByIDQuery } from "../rtkQuery/apiSliceWorkspace";
import { AvatarWithTextLoader, RectangleLoader } from "../components/utilsComponents/MySkeleton";
import Permission from "../Permission";
import BoardCanvas from "../pages/boards/boardCanvas/BoardCanvas";
import { getIdParams } from "../utilsFunctions/generalFuntions";
import MembersPage from "../pages/members/MembersPage";
import ListMembersWorkspace from "../components/members/listMembers/ListMembersWorkspace";
import ListMembersPending from "../components/members/pending/ListMembersPending";
// import BoardCanvas2 from "../pages/boards/boardCanvas/BoardCanvas2";

const RoutesWorkspace = () => {
  // const loader = useLoaderData();
  const params = useParams()

  const workspaceId = getIdParams(params)

  const {isLoading, data={}, isError, currentData} = useGetWorkspaceByIDQuery(workspaceId)

  if(isLoading && !currentData){
    return (
    <LayoutGeneral
      typeMenu={typesMenu.WOKSPACE}
      workspace={data}
    >
      <div className="d-flex flex-column gap-2 gap-md-0 flex-md-row justify-content-center align-items-md-center contianerListWorkspaces fw-bold mb-4">
        <AvatarWithTextLoader height={100}/>
        <RectangleLoader width={300}/>
      </div>
    </LayoutGeneral>
    )
  }

  if(isError || !data){
    return <Navigate to={`/${PrivateRoutes.PRIVATE_HOME}`} replace={true}/>
  }

  return (
    <LayoutGeneral
      typeMenu={typesMenu.WOKSPACE}
      workspace={data}
    >
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={`:workspaceId/${PrivateActionsRoutes.WORKSAPCES.LISTAR}`} />} />
        <Route path={`:workspaceId/${PrivateActionsRoutes.WORKSAPCES.LISTAR}`} element={<WorkspacePage />} />
        <Route path={PrivateActionsRoutes.WORKSAPCES.SETTING} element={<h1>Settings</h1>}/>
        <Route path={`:workspaceId/${PrivateRoutes.SETTINGS}`} element={<h1>settings</h1>} />

        <Route
          element={<Permission permission={PrivateRoutes.MEMBERS}/>}
        >
          <Route path={`:workspaceId/${PrivateRoutes.MEMBERS}/*`} element={<MembersPage />} >
            <Route
              index
              element={<ListMembersWorkspace/>}
            />
            <Route
              path={PrivateActionsRoutes.MEMBERS.PENDING}
              element={<ListMembersPending/>}
            />
          </Route>
        </Route>

        <Route
          path={`:workspaceId/:boardId/${PrivateRoutes.BOARD}`}
          element={<Permission permission={PrivateRoutes.BOARD} component={BoardCanvas}/>}
        />

      </RoutesWithNotFound>
    </LayoutGeneral>
  );
};

export default RoutesWorkspace;
