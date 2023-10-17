import { Suspense, lazy } from 'react'

import { Navigate, Route} from "react-router-dom";
import { initAxios, publicAxios } from "./services/settings";
import { PrivateRoutes, PublicRoutes } from "./routes";
// const Auth = lazy(() => import('./pages/Auth/Auth'));
import Auth from "./pages/Auth/Auth";
import ProtectedRoute from "./ProtectedRoute";
import RoutesWithNotFound from "./routes/RoutesWithNotFound";


// const RoutesHome = lazy(() => import('./routes/RoutesHome'));
// const RoutesWorkspace = lazy(() => import('./routes/RoutesWorkspace'));

import RoutesHome from "./routes/RoutesHome";
import RoutesWorkspace from "./routes/RoutesWorkspace";
import Permission from "./Permission"
import InvitationToWorkspace from './pages/Auth/InvitationToWorkspace';
// import { getWokspaceById } from "./services/workpaceService";

publicAxios();
initAxios();

function App() {
  // const { workspaceId } = useParams()
  // console.log(workspaceId)
  return (
    // <Suspense fallback={<span className="fs-5">Cargando...</span>}>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE_HOME} />} />
        <Route path={PublicRoutes.LOGIN} element={<Auth/>}/>
        <Route path={PublicRoutes.ACCEPT_INVITATION_TO_WORKSPACE} element={<InvitationToWorkspace/>}/>

        {/* -------------------- PROTECTED ROUTES---------------------- */}
        <Route element={<ProtectedRoute/>}>

          <Route
            path={`${PrivateRoutes.PRIVATE_HOME}/*`}
            element={<RoutesHome/>}
          />
          <Route element={<Permission permission={PrivateRoutes.WORKSAPCE} />}>

            <Route
              path={`${PrivateRoutes.PRIVATE_WORKSPACE}/*`}
              element={<RoutesWorkspace/>}
            />
          </Route>

        </Route>
      </RoutesWithNotFound>
    // </Suspense>
  );
}

export default App;
