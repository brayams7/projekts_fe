import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/thunks/authThunk";
import { API_BASE_UI_AVATARS } from "../../../../services/settings";
import { Link } from "react-router-dom";

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
      <ul className="dropdown-menu border-0 shadow px-3 py-2 font-size-12-14" style={{ minWidth:230}}>
        <div className="d-flex align-items-center justify-content-start">
          <span className="d-block rounded-circle text-center" title={user.name}>
           <p><img
              src={`${API_BASE_UI_AVATARS}/?name=${user.name}&background=random&color=fff&size=${SIZE_AVATAR}`}
              alt="avatar"
              className="rounded-circle"
            /></p>
          </span>
          <p><span className="ms-2">{user.name}</span></p>
        </div>
        <div className="d-flex align-items-center justify-content-start">

        <p><i className="bi bi-person-circle me-2"></i></p>

        <Link className="w-500" style={{cursor:"pointer"}} to={`/private_home/profile`}>


            Perfil
            <p></p>

          </Link>
        </div>
        <div className="d-flex align-items-center justify-content-start">


        <p><i className="bi bi-gear me-2"></i></p>

          <li className="w-500" style={{cursor:"pointer"}} onClick={()=>{

          }}>
            Ajustes
            <p></p>
          </li>
        </div>

        <div className="d-flex align-items-center justify-content-start">
        <i className="bi bi-box-arrow-right me-2"></i>
          <li className="w-500" style={{cursor:"pointer"}} onClick={()=>{
            dispatch(logout())
          }}>

          Cerrar Sesión
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
