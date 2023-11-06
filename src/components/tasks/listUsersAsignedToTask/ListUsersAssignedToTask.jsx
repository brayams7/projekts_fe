import { AddMemberIcon } from "../../../utils/icons/iconsMenu";
import AssignMember from "../../features/detailFeature/headerDetailFeature/assignMemberToAFeature/AssignMember";
import { ItemUserAssigned } from "../../features/detailFeature/headerDetailFeature/listUsersAssigned/ListUsersAssignedFeature";

const ListUsersAssignedToTask = ({
  usersAssigned=[],
  usersAddedToTheWorkspace=[],
  taskId,
  setListUsersAssigned
}) => {

const handleSelectUser = ({userId, name, isWatcher}) => {
    if(!usersAssigned.some(user => user.id === userId)){
      setListUsersAssigned(prevState => [...prevState, {id:userId, name, is_watcher:isWatcher}])
    }
  }

  const handleDeleteUser = (userId) => {
    setListUsersAssigned(prevState => prevState.filter(user=>user.id !== userId))
  }

  return (
    <div className="list-users-assigned-container position-relative">

      <ul className="list-unstyled position-relative p-0 d-flex flex-row-reverse justify-content-end">
        <li className="position-relative" style={{marginLeft:"-8"}}>
          <div className="dropdown d-flex align-items-center">
            <a
              href={`#addMemberToTaskOption`}
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span className="custom-icon-border-dashed d-flex align-items-center">
                <AddMemberIcon
                  fill="var(--gray-600)"
                  height="25"
                  width="25"/>
              </span>
            </a>
            <ul
              className="dropdown-menu border-0 shadow py-2"
              id="addMemberToTaskOption"
              style={{minHeight:350, width:250}}

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
        {
          Array.isArray(usersAssigned) && (
            usersAssigned.map(user=>(
              <ItemUserAssigned
                key={user.id}
                username={user.username}
                name={user.name}
                id={user.id}
                style={{ height: 20, width: 20 }}
                sizeAvatar={32}
                componentDelete={<span
                  style={{ top: 5, fontSize:7, left: 30, cursor: "pointer" }}
                  className="position-absolute translate-middle badge rounded-pill bg-danger button-delete-user-assigned"
                  onClick={()=>handleDeleteUser(user.id)}
                >
                  X
              </span>}
              />
            ))
          )
        }
      </ul>


    </div>
  );
};

export default ListUsersAssignedToTask;
