import { useEffect, useMemo, useState } from "react";
import Search from "../../../../../assets/iconsHeader/search.svg";
import {  useSelector } from "react-redux";
import { API_BASE_UI_AVATARS } from "../../../../../services/settings";
import { DeleteIcon } from "../../../../../utils/icons/iconsMenu";

const SIZE_AVATAR = 40

const ItemUser = ({
  name,
  id,
  isMyUser,
  handleAssignUser,
  usersAssigned = [],
  handleDeleteUser,
  username,
  email
}) => {
  // const [mouseIsOver, setMouseIsOver] = useState(false)

  const isMember = useMemo(() => {
    return usersAssigned.some((user) => user.id === id);
  }, [id, usersAssigned]);

  return (
    <li
      role="button"
      className="item-user-assigned-to-workspace d-flex justify-content-start align-items-center rounded px-2 py-1"
      onClick={() => {
        if (!isMember)
          handleAssignUser({ userId: id, isWatcher: isMyUser ? 1 : 0, name, username, email })
      }}
    >
      <span className="pe-2">
        <img
          src={`${API_BASE_UI_AVATARS}/?name=${name}&background=random&color=fff&size=${SIZE_AVATAR}`}
          alt="avatar"
          className="rounded-circle"
        />
      </span>
      <span className="font_size_10_12">{isMyUser ? "Yo" : name}</span>
      {isMember && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteUser(id)
          }}
          className="ms-auto"
        >
          <DeleteIcon fill="var(--purple)" />
        </button>
      )}
    </li>
  );
};

const AssignMember = ({
  usersAddedToTheWorkspace = [],
  boardId,
  // featureId,
  usersAssigned,
  handleAssign,
  handleDelete,
}) => {

  const user = useSelector(stage=>stage.auth.user)


  const [listUsersToShow, setListUsersToShow] = useState(usersAddedToTheWorkspace)


  const handleSearch = (e) => {
    const list = [...usersAddedToTheWorkspace]
    const textData = e.target.value.toLowerCase()

    if(textData.trim().length === 0){
      setListUsersToShow(usersAddedToTheWorkspace)
      return
    }

    setListUsersToShow([
      ...list.filter((item) => {
        let name = item.name ? item.name.toLowerCase() : ""
        return name.includes(textData)
      })
    ])
  };




  useEffect(()=>{



    setListUsersToShow(usersAddedToTheWorkspace)


  },[boardId, usersAddedToTheWorkspace])

  return (
    <div className="d-flex flex-column users-assigned-to-workspace-container">
      <div className="form-group position-relative has-search ms-auto">
        <img className="form-control-feedback" src={Search} alt="search" />
        <input
          type="search"
          name="search"
          className="form-control border-0"
          style={{ minHeight: 40 }}
          onChange={handleSearch}
          placeholder="Buscar..."
          aria-label="Search"
        />
      </div>
      <hr />
      <ul className="w-100 list-unstyled px-2">
        {Array.isArray(listUsersToShow) &&
          listUsersToShow.map((item) => (
            <ItemUser
              key={item.id}
              name={item.name}
              username={item.username}
              email={item.email}
              id={item.id}
              isMyUser={item.id === user?.id}
              handleAssignUser={handleAssign}
              usersAssigned={usersAssigned}
              handleDeleteUser={handleDelete}
            />
          ))}
      </ul>
    </div>
  );
};

export default AssignMember;
