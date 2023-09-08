import { useParams } from "react-router-dom";
import { useGetWorkspaceByIDQuery } from "../../rtkQuery/apiSliceWorkspace";
import WorkspaceTitle from "../../components/worspace/workspaceTitle/WorkspaceTitle";
import ListBoardWorkspaceHome from "../boards/ListBoardWorkspaceHome";
import { AvatarWithTextLoader, RectangleLoader } from "../../components/utilsComponents/MySkeleton";

const WorkspacePage = () => {

  const { workspaceId } = useParams()
  const {isLoading, data={}, isError, currentData, isFetching} = useGetWorkspaceByIDQuery(workspaceId)

  if (isLoading && !currentData) {
    return (
      <div className="d-flex flex-column gap-2 gap-md-0 flex-md-row justify-content-center align-items-md-center contianerListWorkspaces fw-bold mb-4">
        <AvatarWithTextLoader height={100}/>
        <RectangleLoader width={300}/>
      </div>
    )
  }

  if(isError){
    <p>Ocurrio un error</p>
  }

  return (
    <div className="m-4">
      <div className={isFetching ? "mb-4 is-fetching":"mb-4"}>
        {
          data?.id &&(
            <WorkspaceTitle
              isFetching={isFetching}
              color={data.color}
              name={data.name}
              description={data.description}
              workspaceId={data.id}
              userId={data.user_id}
              initials={data.initials}
            />
          )
        }
      </div>
      <hr className="m-auto mb-4"/>
      <div>
        {
          data?.id && (
            <ListBoardWorkspaceHome
              idWorkspace={data.id}
              userId={data.user_id}
              isSearch={true}
            />
          )
        }
      </div>
    </div>
  );
};

export default WorkspacePage;
