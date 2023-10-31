import { useEffect, useState } from "react";
import ListUsersAssignedToTask from "../listUsersAsignedToTask/ListUsersAssignedToTask";

const AssignTaskToUser = ({
  taskId,
  assignedUsers,
  usersAddedToTheWorkspace
}) => {
  const [listUsersAssigned, setListUsersAssigned] = useState([])


  useEffect(()=>{

    const mapListUsersAssigned = listUsersAssigned.map(user=>{
      return {
        id:user.id,
        name:user.name,
        is_watcher:user.is_watcher
      }
    })

    setListUsersAssigned(mapListUsersAssigned)

  },[taskId]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ListUsersAssignedToTask
      usersAssigned={assignedUsers}
      usersAddedToTheWorkspace={usersAddedToTheWorkspace}
      taskId={taskId}
      setListUsersAssigned={setListUsersAssigned}
    />
  );
};

export default AssignTaskToUser;
