import { useEffect, useMemo, useState } from "react";
import { VisibilityIcon } from "../../../../utils/icons/iconsMenu";
import { API_BASE_UI_AVATARS } from "../../../../services/settings";
import { useSelector } from "react-redux";
import { useChangeVisibilityFromUserToAFeatureMutation } from "../../../../rtkQuery/apiSliceFeature";
import { toast } from "react-toastify";

const SIZE_AVATAR = 40;
const IS_VISIBILITY = 1;
const IS_NOT_VISIBILITY = 0;

const ItemViwer = ({ userSession, viwer }) => {
  return (
    <li
      role="button"
      className="item-user-assigned-to-workspace d-flex justify-content-start align-items-center rounded px-2 py-1"
      key={viwer.id}
    >
      <span className="pe-2">
        <img
          src={`${API_BASE_UI_AVATARS}/?name=${viwer.name}&background=random&color=fff&size=${SIZE_AVATAR}`}
          alt="avatar"
          className="rounded-circle"
        />
      </span>
      <span className="font_size_10_12">{viwer.id === userSession?.id ? "Yo" : viwer.name}</span>
    </li>
  );
};

const ViewsFeature = ({ featureId, usersAssigned = [] }) => {
  const [listviwers, setListViwers] = useState([]);
  const user = useSelector((stage) => stage.auth.user);
  const [changeVisibilityRequest] =
    useChangeVisibilityFromUserToAFeatureMutation();

  const countViews = useMemo(() => {
    const count = [
      ...usersAssigned.filter((user) => user.is_watcher === IS_VISIBILITY),
    ].length;
    return count >= 100 ? "99+" : `${count}`;
  }, [usersAssigned]);

  useEffect(() => {
    const hanldeChangeVisibility = async () => {
      try {
        const body = {
          feature_id: featureId,
          user_id: user.id,
          is_watcher: IS_VISIBILITY,
        };

        const response = await changeVisibilityRequest(body).unwrap()
        if (response.code !== 200) {
          console.log("ocurrio un error")
          toast.error("Upss! ocurrió un error",{icon:"😕"})
        }
      } catch (error) {
        console.log(error);
      }
    };

    setListViwers([
      ...usersAssigned.filter((user) => user.is_watcher === IS_VISIBILITY),
    ]);

    const aImNotAVisualizer = usersAssigned.some(
      (visualizer) =>
        visualizer.id === user.id && visualizer.is_watcher === IS_NOT_VISIBILITY
    );
    if (aImNotAVisualizer) {
      hanldeChangeVisibility();
    }
  }, [changeVisibilityRequest, featureId, user.id, usersAssigned]);

  return (
    <div className="dropdown ms-auto">
      <a
        href={`#VisibilityOption`}
        type="button"
        role="button"
        className="position-relative me-3"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="outside"
      >
        <VisibilityIcon fill="var(--purple)" />
        <span
          style={{ top: 12 }}
          className="position-absolute start-100 translate-middle badge rounded-pill bgPurple-color fw-normal"
        >
          {countViews}
        </span>
      </a>
      <ul
        className="dropdown-menu border-0 shadow py-2"
        id="VisibilityOption"
        style={{ minHeight: 300, width: 225 }}
      >
        {listviwers.map((item) => (
          <ItemViwer key={item.id} userSession={user} viwer={item} />
        ))}
      </ul>
    </div>
  );
};

export default ViewsFeature;
