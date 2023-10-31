import { Link } from "react-router-dom";
import Logo from "../../../assets/logo2.png";
import AddIcon from "../../../assets/iconsHeader/add.svg";
import Search from "../../../assets/iconsHeader/search.svg";
import SearchWhite from "../../../assets/iconsHeader/search_white.svg";

import Notification from "../../../assets/iconsHeader/notifications.svg";
// import Help from "../../../assets/iconsHeader/help.svg";
import MenuBar from "../../../assets/iconsHeader/menu_mobile.svg";
import { useSelector } from "react-redux";
import DropDownProfile from "../../user/profile/dropDownProfile/DropDownProfile";
import { PrivateRoutes } from "../../../routes";
// import ProfileDefault from "../../../assets/iconsHeader/profile_default.png";
// eslint-disable-next-line react/prop-types
const HeaderGeneral = ({openMenu,setOpenMenu,styleHeader}) => {

  const user = useSelector((state) => state.auth.user);
  return (
    <div
      className="container-fluid header-navbar"
      style={
        {
          backgroundColor:styleHeader.backgroundColor,
          color:styleHeader.color
        }
      }
    >
      <div className="d-flex h-100 align-items-md-center text-white justify-content-md-between flex-md-row">
        <div className="d-flex gap-0 gap-md-4">
          <div className="d-flex text-center text-md-start align-items-center align-content-center">
            <div className="d-block d-sm-none header-menubar" onClick={()=>setOpenMenu(!openMenu)}>
              <img src={MenuBar} alt="menu bar" />
            </div>

            <Link className="w-100 header-container-logo" to={`/${PrivateRoutes.PRIVATE_HOME}/${PrivateRoutes.BOARD}`}>
              <img
                src={Logo}
                alt="logo"
                className="img-fluid"
                // style={{ width: 45, marginRight: 10 }}
              />{" "}
              <span>Projetks</span>
            </Link>
          </div>

          <ul className="nav d-none d-sm-flex">
            <li className="nav-item">
              <a className="nav-link custom-item-link-white" href="#">
                Recientes
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle custom-item-link-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Espacios de trabajo
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link custom-item-link-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={AddIcon}
                  className="header-add-resource"
                  alt="add icon"
                />
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="nav d-flex d-sm-none align-items-center">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle custom-item-link-white px-2 px-md-3"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Más
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link custom-item-link-white px-2 px-md-3"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={AddIcon}
                  alt="add icon"
                  className="header-add-resource"
                />
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <ul className="nav ms-auto align-items-center gap-sm-2 flex-nowrap">
          <li className="nav-item d-none d-lg-block">
            <form className="d-flex" role="search">
              <div className="form-group has-search">
                <img
                  className="form-control-feedback"
                  src={Search}
                  alt="search"
                />
                <input
                  type="search"
                  name="search"
                  className="form-control"
                  // onChange={handleSearch}
                  placeholder="Buscar"
                  aria-label="Search"
                />
              </div>
            </form>
          </li>

          <li className="nav-item d-block d-lg-none">
            <img
              src={SearchWhite}
              alt="notification"
              style={{fill:"#F9F8FA"}}
              className="d-block header-icon-rigth"
            />
          </li>

          <li className="nav-item">
            <img
              src={Notification}
              alt="notification"
              className="d-block header-icon-rigth"
            />
          </li>
          {/* <li className="nav-item">
            <img src={Help} alt="help" className="d-block header-icon-rigth" />
          </li> */}

          <li className="nav-item">
            <DropDownProfile
              user={user}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderGeneral;
