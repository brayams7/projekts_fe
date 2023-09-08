import { Route } from "react-router-dom";
import RoutesWithNotFound from "./RoutesWithNotFound";
// import Layout from "../components/layout/Layout";
import { PrivateActionsRoutes, PrivateRoutes } from "../routes";
import { Editar, Listar } from "../pages";
import LayoutGeneral from "../components/layout/GeneralLayout/LayoutGeneral";

const RoutesBoard = () => {
  return (
    <LayoutGeneral>
      <RoutesWithNotFound>
        {/* <Route path={`${PrivateRoutes.BOARD}/`}/> */}
        <Route
          path={`/${PrivateRoutes.TASKS}/*`}
          element={
            <RoutesWithNotFound>
              <Route
                path={PrivateActionsRoutes.TASKS.LISTAR}
                element={<Listar />}
              />
              <Route
                path={PrivateActionsRoutes.TASKS.EDIT}
                element={<Editar />}
              />
            </RoutesWithNotFound>
          }
        />

        {/* </Route> */}
      </RoutesWithNotFound>
    </LayoutGeneral>
  );
};

export default RoutesBoard;
