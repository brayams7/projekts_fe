import { useSelector } from "react-redux";
import { useGetAllWorkspacesUserQuery } from "../../rtkQuery/apiSliceWorkspace";
import "./workspaceStyle.css"
import Workspace from "../../components/worspace/Workspace";
import { HeaderWorkspaceLoader } from "../../components/utilsComponents/MySkeleton";
const ListWorkspaces = () => {

  const { id } = useSelector(state=>state.auth.user)

  const {isLoading, data=[], currentData} = useGetAllWorkspacesUserQuery(id)

  if (isLoading && !currentData) {
    return (
      <div className="d-flex flex-column contianerListWorkspaces fw-bold">
      <p className="mb-4">TUS ESPACIOS DE TRABAJO</p>
        <HeaderWorkspaceLoader/>
      </div>
    )
  }


  return (
    <div className="d-flex flex-column contianerListWorkspaces fw-bold">
      <p className="mb-4">TUS ESPACIOS DE TRABAJO</p>
      {
        Array.isArray(data) && (
          data.map(item=>(
            <Workspace
              key={item.id}
              color={item.color}
              updatedAt={item.updated_at}
              name={item.name}
              userId={item.user_id}
              id={item.id}
              members={item.members}
              initials={item.initials}
            />
          ))
        )
      }

    </div>
  );
};

export default ListWorkspaces;
