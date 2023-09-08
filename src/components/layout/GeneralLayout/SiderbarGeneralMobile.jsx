import ItemMenuGeneral from "./ItemMenuGeneral";

// eslint-disable-next-line react/prop-types
const SiderbarGeneralMobile = (
  {
    openMenu,
    getfilteredPermisssions,
    typeMenu,
    workspace,
    styleSiderbar
  }
) => {

  return (
    <div id="mobile-navbar"
      className={
        !openMenu ? "mobile-navbar position-fixed h-100 w-100 flex-column" :
        "mobile-navbar position-fixed h-100 w-100 flex-column open"
      }
    >
      <div className="flex-column menu-sidebar">
        <div className="list-menu-sidebar m-3">
          <ul className="list-unstyled">
          {
              getfilteredPermisssions().map((item,id)=>(
                item?.isShowInSidebar && (
                  <ItemMenuGeneral
                  styleSiderbar={styleSiderbar}
                    typeMenu={typeMenu}
                    key={id}
                    workspace={workspace}
                    name={item.name}
                    icon={item.icon}
                    path={item.path}
                    subroutes={item?.subroutes ? item.subroutes : []}
                  />
                )
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SiderbarGeneralMobile;
