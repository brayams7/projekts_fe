import { useSelector } from "react-redux";
import { useGetAllWorkspacesUserQuery } from "../../rtkQuery/apiSliceWorkspace";
import "./workspaceStyle.css"
import Workspace from "../../components/worspace/Workspace";
import { HeaderWorkspaceLoader } from "../../components/utilsComponents/MySkeleton";
import DropDownTypesWorkpaces from "../../components/typesWorkpace/dropDownTypesWorkspace/DropDownTypesWorkpaces";
import { useEffect, useState } from "react";
const ListWorkspaces = () => {

  const { id } = useSelector(state=>state.auth.user)
  const [listWorkspaces, setlistWorkspaces] = useState ([])

  const {isLoading, data=[], currentData} = useGetAllWorkspacesUserQuery(id)
  const handleChange = (option) => {
    if (option.value === 'TODOS'){
      setlistWorkspaces(data)
      return
    }
    const workspaces = data.filter ((item)=>item.workspace_type_id === option.value)
    setlistWorkspaces (workspaces)

  }
  console.log (data)
  useEffect (()=>{
      if (data&&Array.isArray (data)&&data.length>0) {
        setlistWorkspaces (data)
      }
  }, [data])
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
      <div className="d-flex flex-grap justify-content-between">
      <p className="mb-4">TUS ESPACIOS DE TRABAJO</p>
      <DropDownTypesWorkpaces
        handleChange={handleChange}

      />
      </div>
      {
        Array.isArray(listWorkspaces) &&listWorkspaces.length>0&& (
          listWorkspaces.map(item=>(
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
