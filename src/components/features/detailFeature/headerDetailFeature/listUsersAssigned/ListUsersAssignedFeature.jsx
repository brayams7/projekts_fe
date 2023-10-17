
import { API_BASE_UI_AVATARS } from "../../../../../services/settings";
import { AddMemberIcon } from "../../../../../utils/icons/iconsMenu";
import AssignMemberToFeature from "../assignMemberToAFeature/AssignMemberToFeature";

const SIZE_AVATAR = 40


const ItemUserAssigned = ({name}) =>{

  // const initials = username.split(0,2) ?? ""

  return (
    <li
      style={{ height: 46, width: 46 }}
      className="position-relative item-user-assigned-feature"
    >
      <img
        src={`${API_BASE_UI_AVATARS}/?name=${name}&background=random&color=fff&size=${SIZE_AVATAR}`}
        alt="avatar"
        className="rounded-circle position-relative"
      />

    </li>
  );
}

const ListUsersAssignedFeature = ({
  usersAssigned=[],
  usersAddedToTheWorkspace=[],
  featureId,
  boardId,
}) => {

  return (
    <div className="list-users-assigned-feature-container position-relative">

      <ul className="list-unstyled position-relative d-flex flex-row-reverse justify-content-end">
        <li className="position-relative item-user-assigned-feature">
          <div className="dropdown">
            <a
              href={`#addMemberOption`}
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span className="custom-icon-border-dashed d-block">
                <AddMemberIcon fill="var(--gray-600)" height="36" width="36"/>
              </span>
            </a>
            <ul
              className="dropdown-menu border-0 shadow py-2"
              id="addMemberOption"
              style={{minHeight:350, width:250}}
            >
              <AssignMemberToFeature
                usersAddedToTheWorkspace={usersAddedToTheWorkspace}
                usersAssigned={usersAssigned}
                boardId={boardId}
                featureId={featureId}
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
                featureId={featureId}
              />
            ))
          )
        }
      </ul>


    </div>
  );
};

export default ListUsersAssignedFeature;
