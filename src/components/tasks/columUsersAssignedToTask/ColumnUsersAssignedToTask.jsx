import AssignTaskToUser from "../assignTaskToUser/AssignTaskToUser";

const ColumnUsersAssignedToTask = ({
  taskId,
  assignedUsers,
  usersAddedToTheWorkspace
}) => {

  return (
    <AssignTaskToUser
      taskId={taskId}
      assignedUsers={assignedUsers}
      usersAddedToTheWorkspace={usersAddedToTheWorkspace}
    />
  );
};

export default ColumnUsersAssignedToTask;
