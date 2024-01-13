import { useEffect, useState } from "react";
import { formatTimeTracking, getFormatTime } from "../../../../utilsFunctions/generalFuntions";
import { DeleteIcon } from "../../../../utils/icons/iconsMenu";
import { useSelector } from "react-redux";
// import { setTrackingSelect } from "../../../../redux/slices/trackingSlice";
import LoadingIcon from '../../../../assets/loadings/EllipsisLoading40px.svg'

const ItemUserAddedToTrackingTime = ({
  item,
  onClickRow,
  onClickDelete,
  isCanDelete=false,
  isSelected=false,
  trackingSelect=null
}) => {

  return  (
    <li
      className={`d-flex align-items-center py-2 justify-content-start
        font-size-10-12 item-user-added-to-tracking-time ps-2 rounded ${isSelected ? 'selected' : ''}`}
      style={{
        cursor:"pointer"
      }}
      onClick={()=>onClickRow(item)}
    >
      <span>
        {item.total_minutes_format}
      </span>
      {
        isCanDelete &&
        <button
          type="button"
          className="ms-auto me-2"
          disabled={(trackingSelect.isLoadingDelete && trackingSelect?.trackingSelect?.id === item.id)}
          onClick={(e)=>{
            e.stopPropagation()
            onClickDelete(item)
          }}
        >
          {
            (trackingSelect.isLoadingDelete && trackingSelect?.trackingSelect?.id === item.id) ?
              <img className="ms-auto" src={LoadingIcon} height={20} width={20} alt="loading" />
            :
              <DeleteIcon fill="var(--red)" width="20" height="20"/>
          }
        </button>
      }
    </li>
  )
}

const ListUsersAddedToTrackingTime = ({
  listUsers=[],
  onClickRow,
  onClickDelete,
  idTrackingSelected
}) => {

  const [usersAddedToTrackingTime, setUsersAddedToTrackingTime] = useState([])
  const tracking = useSelector(state => state.tracking)
  const userSession = useSelector(state => state.auth.user)

  // const [isCanDelete, setIsCanDelete] = useState(false)
  // const usersAddedToTrackingTime = useMemo(()=>{

  //   return listUsers.map(user=>{
  //     const totalMinutesFormat =

  //   })

  // },[listUsers])

  useEffect(()=>{
    const mapUsersToAddedTrackingTime = (listTraking = []) =>{
      const listUsersMap = listTraking.map(item => {
        if(Array.isArray(item?.trackings)){
          item.trackings = mapUsersToAddedTrackingTime(item?.trackings)
        }

        const totalMinutesFormat = item?.total_minutes ?
                            getFormatTime(formatTimeTracking(item.total_minutes)) :
                            item?.full_minutes ?
                            getFormatTime(formatTimeTracking(item?.full_minutes)) : ''
        return {
          ...item,
          total_minutes_format: totalMinutesFormat
        }
      })

      return listUsersMap
    }

    const list = mapUsersToAddedTrackingTime(listUsers)

    // setIsCanDelete(list.some(item =>item.id === user.id))

    setUsersAddedToTrackingTime(list)

  },[listUsers])

  return (
    <ul className="container-users-added-to-time px-3 mb-4">
      {
        usersAddedToTrackingTime.map((user, index)=>{
          return (
            <li key={index}>
              <div
                className=""
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${index}`}
                aria-expanded="false"
                aria-controls={`collapse-${index}`}
              >
                <div className="d-flex align-items-center justify-content-start">
                  <img
                    src={user?.picture_url}
                    alt="user"
                    className="rounded-circle"
                    width="30"
                    height="30"
                  />
                  <span className="ms-2">{user?.name}</span>

                  <span className="ms-auto">
                    {user?.total_minutes_format}
                  </span>
                </div>
              </div>
              <div className="collapse" id={`collapse-${index}`}>
                <ul className="list-users-added-to-time d-flex flex-column mt-2">
                  {
                    user?.trackings?.map((item, index)=>(
                      <ItemUserAddedToTrackingTime
                        key={index}
                        onClickDelete={onClickDelete}
                        onClickRow={onClickRow}
                        item={item}
                        isCanDelete={user.id === userSession.id}
                        isSelected={idTrackingSelected === item.id}
                        trackingSelect={tracking}
                      />
                    ))
                  }
                </ul>
              </div>
            </li>
          );
        })
      }
    </ul>
  );
};

export default ListUsersAddedToTrackingTime;
