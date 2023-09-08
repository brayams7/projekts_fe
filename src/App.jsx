// import { useEffect, useState } from 'react'

import { Navigate, Route} from "react-router-dom";
import { initAxios, publicAxios } from "./services/settings";
import { PrivateRoutes, PublicRoutes } from "./routes";
import Auth from "./pages/Auth/Auth";
import ProtectedRoute from "./ProtectedRoute";
import RoutesWithNotFound from "./routes/RoutesWithNotFound";
import RoutesHome from "./routes/RoutesHome";
import RoutesWorkspace from "./routes/RoutesWorkspace";
import Permission from "./Permission"
// import { getWokspaceById } from "./services/workpaceService";

publicAxios();
initAxios();

function App() {
  // const { workspaceId } = useParams()
  // console.log(workspaceId)
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE_HOME} />} />
      <Route path={PublicRoutes.LOGIN} element={<Auth/>}/>


      {/* -------------------- PROTECTED ROUTES---------------------- */}
      <Route element={<ProtectedRoute/>}>

        <Route
          path={`${PrivateRoutes.PRIVATE_HOME}/*`}
          element={<RoutesHome/>}
        />

        {/* <Route
          loader={async ({request})=>{
            console.log("test")
              const data = await getWokspaceById()
              console.log({data})
              return "hola"
            }}
          path="test/"

          element={<h1>hola mundo</h1>}
        >
        </Route> */}

        <Route element={<Permission permission={PrivateRoutes.WORKSAPCE} />}>

          <Route

            path={`${PrivateRoutes.PRIVATE_WORKSPACE}/*`}
            element={<RoutesWorkspace/>}
          />
        </Route>

      </Route>
    </RoutesWithNotFound>
  );
}

export default App;
