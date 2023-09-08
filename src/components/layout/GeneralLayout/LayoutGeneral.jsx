import { useState } from "react";
import HeaderGeneral from "./HeaderGeneral";
import SiderbarGeneral from "./SiderbarGeneral";
import "./generalLayout.css";
import { useSelector } from "react-redux";
import { typesMenu } from "../../../Menu";

const LayoutGeneral = ({children, typeMenu, workspace}) => {

  const [openMenu, setOpenMenu] = useState(false)

  const {stylesLayout} = useSelector(state=>state.layout)
  return (

    <div>
      <HeaderGeneral
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        styleHeader={stylesLayout.header}
      />
      <div className="wrapper-general" style={{backgroundColor:"var(--gray)"}}>
        <div
          className={
            typesMenu.HOME === typeMenu ? "container-xl d-flex px-0" :
            typesMenu.WOKSPACE === typeMenu ? "container-fluid d-flex px-0" :
            "container-fluid d-flex px-0"
          }
        >
          {/* <SiderbarGeneralMobile
            workspace={workspace}
            getfilteredPermisssions={getfilteredPermisssions}
            typeMenu={typeMenu}
            openMenu={openMenu}
            styleSiderbar={siderbar}
          /> */}
          <SiderbarGeneral
            openMenu={openMenu}
            styleSiderbar={stylesLayout.siderbar}
            workspace={workspace}
            typeMenu={typeMenu}
          />

          {
            typesMenu.HOME === typeMenu ? (
              <div className="main-container m-3" style={{color:"var(--lightDark)"}}>
                {children}
              </div>
            ): (
              <div className="content-wrapper-canvas d-flex flex-column" style={{color:"var(--lightDark)"}}>
                {children}
              </div>
            )
          }

        </div>
      </div>
    </div>

  );
};

export default LayoutGeneral;
