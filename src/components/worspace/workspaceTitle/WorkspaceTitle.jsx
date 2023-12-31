import React, { useState } from "react";
import { EditIcon } from "../../../utils/icons/iconsWorkspace";
import "./workspaceTitle.css";
import EditWorkspace from "../EditWorkspace";
import AddMemberToWorkspace from "../addMember/AddMemberToWorkspace";

const WorkspaceTitle = ({
  name,
  color,
  description = "",
  userId,
  workspaceId,
  initials,
  members=[]
}) => {
  const [isShowEditForm, setIsShowEditForm] = useState(false);

  const nameAvatar = name.charAt(0);

  return (
    <React.Fragment>
      <AddMemberToWorkspace
        workspaceId={workspaceId}
        members={members}
      />
      <div className="d-flex flex-column gap-3 gap-md-0 flex-md-row justify-content-evenly align-items-md-center contianerListWorkspaces fw-bold mb-4">
        {!isShowEditForm ? (
          <div>
            <span
              style={{
                backgroundColor: color,
              }}
              className="d-inline-block text-center workspace-avata-title me-3"
            >
              {nameAvatar}
            </span>
            {name}

            <button
              type="button"
              className="border-0 ms-2"
              title=" Editar "
              onClick={() => setIsShowEditForm(!isShowEditForm)}
            >
              <span className="d-inline-block">
                <EditIcon fill="var(--blueDark)" />
              </span>
            </button>
          </div>
        ) : (
          <EditWorkspace
            name={name}
            color={color}
            initials={initials}
            description={description}
            userId={userId}
            workspaceId={workspaceId}
            setIsShowEditForm={setIsShowEditForm}
            isShowEditForm={isShowEditForm}
          />
        )}

        <div>
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalAddMemberToWorkspace"
          >
            Agregar miembros al espacio de trabajo
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WorkspaceTitle;
