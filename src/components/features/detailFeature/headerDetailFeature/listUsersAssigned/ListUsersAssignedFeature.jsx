
import { useDispatch } from "react-redux";
import { useAssignFeatureToUserMutation, useDeleteUserToFeatureMutation } from "../../../../../rtkQuery/apiSliceFeature";
import { API_BASE_UI_AVATARS } from "../../../../../services/settings";
import { AddMemberIcon } from "../../../../../utils/icons/iconsMenu";
import AssignMember from "../assignMemberToAFeature/AssignMember";
import { setLoading } from "../../../../../redux/slices/featureSlice";
import { toast } from "react-toastify";
import './style.css'

const SIZE_AVATAR = 40


export const ItemUserAssigned = ({name, style, sizeAvatar, componentDelete=null}) =>{

  // const initials = username.split(0,2) ?? ""

  return (
    <li
      style={style}
      className="position-relative item-user-assigned"
    >
      <img
        src={`${API_BASE_UI_AVATARS}/?name=${name}&background=random&color=ffff&size=${sizeAvatar}`}
        alt="avatar"
        className="rounded-circle position-relative text-white"
      />
      {
        componentDelete && componentDelete
      }
    </li>
  );
}

const ListUsersAssignedFeature = ({
  usersAssigned=[],
  usersAddedToTheWorkspace=[],
  featureId,
  boardId,
}) => {

  const dispatch = useDispatch()

  const [assignFeatureToUserRequest] = useAssignFeatureToUserMutation()
  const [deletUserToFeatureRequest] = useDeleteUserToFeatureMutation()

  const handleAssignUserToFeature = async ({userId, isWatcher}) =>{
    try {

      const body = {
        feature_id:featureId,
        user_id:userId,
        is_watcher:isWatcher,
      }

      dispatch(setLoading(true))
      const response = await assignFeatureToUserRequest(body).unwrap()
      if(response.code === 200){
        toast.success("Tablero creado!",{icon:"😃"})

      }else{
        toast.error("Upss! ocurrió un error",{icon:"😕"})

      }

    } catch (error) {

      toast.error("Upss! ocurrió un error",{icon:"😕"})

      console.log(error)
    }finally{

      dispatch(setLoading(false))
    }
  }


  const handleDeleteUserToFeature = async (userId)=>{
    try {

      const body = {
        feature_id:featureId,
        user_id:userId,
        is_watcher:0
      }

      dispatch(setLoading(true))
      const response = await deletUserToFeatureRequest(body).unwrap()
      if(response.code === 200){
        toast.success("Tablero creado!",{icon:"😃"})

      }else{
        toast.error("Upss! ocurrió un error",{icon:"😕"})

      }

    } catch (error) {

      toast.error("Upss! ocurrió un error",{icon:"😕"})

      console.log(error)
    }finally{

      dispatch(setLoading(false))
    }
  }

  return (
    <div className="list-users-assigned-container position-relative">

      <ul className="list-unstyled position-relative d-flex flex-row-reverse justify-content-end">
        <li className="position-relative item-user-assigned">
          <div className="dropdown">
            <a
              href={`#addMemberOption`}
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span className="custom-icon-border-dashed d-flex align-items-center">
                <AddMemberIcon fill="var(--gray-600)" height="33" width="33"/>
              </span>
            </a>
            <ul
              className="dropdown-menu border-0 shadow py-2"
              id="addMemberOption"
              style={{minHeight:350, width:250}}
            >
              <AssignMember
                usersAddedToTheWorkspace={usersAddedToTheWorkspace}
                usersAssigned={usersAssigned}
                boardId={boardId}
                featureId={featureId}
                handleAssign={handleAssignUserToFeature}
                handleDelete={handleDeleteUserToFeature}
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
                style={{ height: 40, width: 40 }}
                sizeAvatar={SIZE_AVATAR}
              />
            ))
          )
        }
      </ul>


    </div>
  );
};

export default ListUsersAssignedFeature;
