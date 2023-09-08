import { typesMenu } from "../../../Menu";
import { PrivateRoutes } from "../../../routes";
import CustomLink from "../CustomLink";

const ItemMenuGeneral = (
  {
    name,
    icon,
    path,
    subroutes = [],
    id,
    typeMenu,
    workspace={},
    styleSiderbar,
    stylesLayoutItem
}) => {
  const workpaceId = workspace?.id ? workspace.id : null

  const BASE_PRIVATE_PATH = typeMenu === typesMenu.HOME ?
    PrivateRoutes.PRIVATE_HOME :
    `${PrivateRoutes.PRIVATE_WORKSPACE}/${workpaceId}`


  if (Array.isArray(subroutes) && subroutes.length > 0) {
    return (
      <li className="nav-item dropdown">
        <a
          href={`#homeSubmenu${id}`}
          className="dropdown-toggle accordion-button custom-nav-item-dropdown mb-2"
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls="collapseExample"
          style={{color:styleSiderbar.color}}
        >
          {/* <img src={icon} style={{fill:"rgba(45, 73, 188, 0.5) !important"}} alt={`icon ${name}`} /> {name} */}
          <span className="d-inline-block">
            {icon("#44546f")}
          </span> {name}
        </a>
        <ul
          className="collapse list-unstyled show"
          id={`homeSubmenu${id}`}

        >
          {
            subroutes.map((item, i)=>(
              item?.isShowInSidebar && (
                <li key={i} className="nav-item custom-nav-subitem-siderbar">
                  <CustomLink
                    isLinkHome={true}
                    to={`/${BASE_PRIVATE_PATH}/${item.path}`}
                    className="nav-link d-block"
                    color={styleSiderbar.color}
                    stylesLayoutItem={item.stylesLayout}
                  >
                    {item.name}
                  </CustomLink>
                </li>
              )
            ))
          }

        </ul>
      </li>
    )
  }else{
    return (
      <li
        className="nav-item custom-nav-item-siderbar"
      >
        <CustomLink
          isLinkHome={true}
          to={`/${BASE_PRIVATE_PATH}/${path}`}
          className="nav-link d-block"
          color={styleSiderbar.color}
          stylesLayoutItem={stylesLayoutItem}
        >
          {/* <img src={icon}  style={{fill:"rgba(45, 73, 188, 0.5) !important"}} alt={`icon ${name}`} /> {name} */}
          <span className="d-inline-block">
            {icon(styleSiderbar.color)}
          </span> {name}
        </CustomLink>
      </li>
    );
  }

};

export default ItemMenuGeneral;
