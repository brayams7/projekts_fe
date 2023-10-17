import { useEffect, useMemo, useState } from "react";
import Search from "../../../../../assets/iconsHeader/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_UI_AVATARS } from "../../../../../services/settings";
import { useAssignFeatureToUserMutation, useDeleteUserToFeatureMutation } from "../../../../../rtkQuery/apiSliceFeature";
import { toast } from "react-toastify";
import { setLoading } from "../../../../../redux/slices/featureSlice";
import { DeleteIcon } from "../../../../../utils/icons/iconsMenu";

const SIZE_AVATAR = 40

const ItemUser = ({ name, id, isMyUser, handleAssignUserToFeature, usersAssigned=[], handleDeleteUserToFeature }) => {

  // const [mouseIsOver, setMouseIsOver] = useState(false)

  const isMember = useMemo(()=>{

    return usersAssigned.some(user=>user.id === id)

  },[id, usersAssigned])

  return (
    <li
      role="button"
      className="item-user-assigned-to-workspace d-flex justify-content-start align-items-center rounded px-2 py-1"
      onClick={()=>{
        if(!isMember) handleAssignUserToFeature(id, isMyUser ? 1 : 0)
      }}
    >
      <span className="pe-2">
        <img
          src={`${API_BASE_UI_AVATARS}/?name=${name}&background=random&color=fff&size=${SIZE_AVATAR}`}
          alt="avatar"
          className="rounded-circle"
        />
      </span>
      <span className="font_size_10_12">
        {
          isMyUser ?
          "Yo"
          :
          name
        }
      </span>
      {
        isMember && (
          <button
            type="button"
            onClick={(e)=>{
              e.stopPropagation()
              handleDeleteUserToFeature(id)
            }}
            className="ms-auto"
          >

          <DeleteIcon fill="var(--purple)"/>

          </button>
        )
      }
    </li>
  );
};

const AssignMemberToFeature = ({ usersAddedToTheWorkspace = [], boardId, featureId, usersAssigned }) => {

  const user = useSelector(stage=>stage.auth.user)
  const dispatch = useDispatch()

  const [assignFeatureToUserRequest] = useAssignFeatureToUserMutation()
  const [deletUserToFeatureRequest] = useDeleteUserToFeatureMutation()

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

  const handleAssignUserToFeature = async (userId, isWatcher) =>{
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
              id={item.id}
              isMyUser={item.id === user?.id}
              handleAssignUserToFeature={handleAssignUserToFeature}
              usersAssigned={usersAssigned}
              handleDeleteUserToFeature={handleDeleteUserToFeature}
            />
          ))}
      </ul>
    </div>
  );
};

export default AssignMemberToFeature;
