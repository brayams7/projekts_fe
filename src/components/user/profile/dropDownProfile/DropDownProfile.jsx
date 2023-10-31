import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/thunks/authThunk";
import { API_BASE_UI_AVATARS } from "../../../../services/settings";

const SIZE_AVATAR = 32

const DropDownProfile = ({
  user
}) => {
  const dispatch = useDispatch()

  return (
    <div className="dropdown">
      <a
        className="nav-link custom-item-link-white p-2 p-md-3"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="d-block rounded-circle text-center" title={user.name}>
          <img
            src={`${API_BASE_UI_AVATARS}/?name=${user.name}&background=random&color=fff&size=${SIZE_AVATAR}`}
            alt="avatar"
            className="rounded-circle"
          />
        </span>
      </a>
      <ul className="dropdown-menu border-0 shadow px-3 py-2 font-size-12-14">
        <div className="d-flex align-items-center">
          <li className="w-100" style={{cursor:"pointer"}} onClick={()=>{
            dispatch(logout())
          }}>
            Cerrar sesión
          </li>
        </div>
        {/* <li>
          <a className="dropdown-item" href="#">
            Another action
          </a>
        </li> */}

      </ul>
    </div>
  );
};

export default DropDownProfile;
