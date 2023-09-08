import { PrivateRoutes } from "../../routes";
import CustomLink from "./CustomLink";

// eslint-disable-next-line react/prop-types
const ItemMenu = ({ name, icon, path, subroutes=[]}) => {

  if (Array.isArray(subroutes) && subroutes.length > 0) {
    return (
      <li className="dropdown">
        <a
          href="#homeSubmenu1"
          className="dropdown-toggle custom-toggle-menu"
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <img src={icon} alt={`icon ${name}`} /> {name}
        </a>
        <ul className="collapse list-unstyled menu" id="homeSubmenu1">

          {
            subroutes.map((item, i)=>(
              item?.isShowInSidebar && (
                <li key={i} className="ps-3">
                  <CustomLink isLinkHome={false} to={`/${PrivateRoutes.PRIVATE}/${item.path}`}>{item.name}</CustomLink>
                </li>
              )
            ))
          }
        </ul>
      </li>
    );
  }

  return (
    <li className="nav-item">
      <CustomLink to={`/${PrivateRoutes.PRIVATE}/${path}`} className="nav-link-custom w-100">
        <img src={icon} alt={`icon ${name}`} /> {name}
      </CustomLink>
    </li>
  );
};

export default ItemMenu;
