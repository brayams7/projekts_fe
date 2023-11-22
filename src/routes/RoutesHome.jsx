import { Navigate, Route } from "react-router-dom";
import RoutesWithNotFound from "./RoutesWithNotFound";
import LayoutGeneral from "../components/layout/GeneralLayout/LayoutGeneral";
import { PrivateRoutes } from "../routes";
import Dashboard from "../pages/Dashboard/Dashboard";
// import RoutesWorkspace from "./RoutesWorkspace";
// import Permission from "../Permission";
import ListWorkspacesPage from "../pages/Workpace/ListWorkspacesPage";
// import ListsBoards from "../pages/boards/ListsBoards";
import {  typesMenu } from "../Menu";
import ProfileEditPage from "../pages/Profile/ProfileEditPage";

const RoutesHome = () => {

  return (
    <LayoutGeneral typeMenu={typesMenu.HOME}>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
        <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
        <Route path={PrivateRoutes.BOARD} element={<ListWorkspacesPage />} />
        <Route path={PrivateRoutes.PROFILE} element={<ProfileEditPage />} />

        {/* <Route element={<Permission permission={PrivateRoutes.WORKSAPCE} />}>
          <Route
            path={`/${PrivateRoutes.WORKSAPCE}/*`}
            element={<RoutesWorkspace />}
          />
        </Route> */}

        {/* <Route path={PrivateRoutes.WORKSAPCE} element={<Permission component={Workspace} permission={PrivateRoutes.WORKSAPCE}/>}/> */}
      </RoutesWithNotFound>
    </LayoutGeneral>
  );
};

export default RoutesHome;
