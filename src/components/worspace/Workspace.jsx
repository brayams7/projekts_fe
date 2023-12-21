import { Link } from "react-router-dom";
import { BoardIcon, MembersIcon, SettingsIcon } from "../../utils/icons/iconsMenu";
import ListBoardWorkspaceHome from "../../pages/boards/ListBoardWorkspaceHome";
import { PrivateActionsRoutes, PrivateRoutes } from "../../routes";
import { useState } from "react";
import EditWorkspace from "./EditWorkspace/EditWorkspace.jsx";

const Workspace = ({ color, updatedAt, name = "", userId, id, members = [], initials, description, type }) =>
{
  const [showEditWorkspace, setShowEditWorkspace] = useState(false);

  const nameAvatar = name.charAt(0);
  const totalMembers = Array.isArray(members) ? members.length : "";

  return (
    <>
      <div className="d-flex flex-column mb-4">
        <span className="updateAt-workspace ms-auto">Última actualización {updatedAt}</span>
        <div className="row mb-4">
          <div className="col-12 col-md-4 mb-2 mb-sm-0">
					<span
            style={{ backgroundColor: color }}
            className="d-inline-block text-center workspace-avatar me-3"
          >
						{nameAvatar}
					</span>
            {name}
          </div>
          <div className="col-12 col-md-8 d-flex align-items-center flex-wrap gap-2">
            <div className="workspace-option d-flex align-items-center px-3 py-1">
						<span>
							<BoardIcon
                fill="#44546f"
                height="18"
                width="18"
              />
						</span>
              <Link
                to={`/${PrivateRoutes.PRIVATE_WORKSPACE}/${id}/${PrivateActionsRoutes.WORKSAPCES.LISTAR}`}
              >
                Tableros
              </Link>
            </div>

            <div className="workspace-option d-flex align-items-center px-3 py-1">
						<span>
							<MembersIcon
                fill="#44546f"
                height="18"
                width="18"
              />
						</span>
              <Link to={"/"}>
                Miembros <span className="fw-bold">{totalMembers}</span>
              </Link>
            </div>

            <div className="workspace-option d-flex align-items-center px-3 py-1">
						<span>
							<SettingsIcon
                fill="#44546f"
                height="18"
                width="18"
              />
						</span>
              <Link to={"/"}>Configuración</Link>
            </div>

            <div
              className="workspace-option d-flex align-items-center justify-content-center px-3 py-1"
              onClick={() => setShowEditWorkspace(true)}
            >
						<span>
							<i className="bi bi-pencil-square me-2"></i>
						</span>
              Editar
            </div>
          </div>
        </div>
        {id &&
          (
            <ListBoardWorkspaceHome
              idWorkspace={id}
              userId={userId}
            />
          )}
      </div>
      <EditWorkspace
        show={showEditWorkspace}
        setShow={setShowEditWorkspace}
        id={id}
        name={name}
        description={description}
        type={type}
        initials={initials}
        color={color}
        userId={userId}
      />
    </>
  );
};

export default Workspace;
