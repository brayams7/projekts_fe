import { AddMemberIcon } from "../../../utils/icons/iconsMenu";
import AssignMember from "../../features/detailFeature/headerDetailFeature/assignMemberToAFeature/AssignMember";

const DropdownAddUserToTask = ({
  Icon,
  usersAddedToTheWorkspace,
  usersAssigned,
  taskId,
  handleSelectUser,
  handleDeleteUser,
}) => {
  return (
    <li className="position-relative" style={{ marginLeft: "-8" }}>
      <div className="dropdown d-flex align-items-center">
        <a
          href={`#addMemberToTaskOption`}
          type="button"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
        >
          {Icon ? (
            Icon
          ) : (
            <span className="custom-icon-border-dashed d-flex align-items-center">
              <AddMemberIcon fill="var(--gray-600)" height="25" width="25" />
            </span>
          )}
        </a>
        <ul
          className="dropdown-menu border-0 shadow py-2"
          id="addMemberToTaskOption"
          style={{ minHeight: 350, width: 250 }}
        >
          <AssignMember
            usersAddedToTheWorkspace={usersAddedToTheWorkspace}
            usersAssigned={usersAssigned}
            boardId={taskId}
            handleAssign={handleSelectUser}
            handleDelete={handleDeleteUser}
          />
        </ul>
      </div>
    </li>
  );
};

export default DropdownAddUserToTask;
