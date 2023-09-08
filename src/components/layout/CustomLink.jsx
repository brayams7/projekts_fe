// import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useStylesLayout } from "../../hooks/layout/useStylesLayout";

// eslint-disable-next-line react/prop-types
const CustomLink = ({to, isLinkHome, children,color,stylesLayoutItem={}, ...props}) => {
  const {
    setStylesLayout
  } = useStylesLayout()

  const handleChangeStylesLayout = ()=>{

    setStylesLayout({
      content: stylesLayoutItem?.content,
      board: stylesLayoutItem?.board,
      header: stylesLayoutItem?.header,
      siderbar: stylesLayoutItem?.siderbar,
    });
  }

  return (
    <NavLink
      to={to}
      style={{color}}
      {...props}
      className={({ isActive }) => {
        if(isLinkHome){
          return isActive ? "nav-link d-block active_link_home" : "nav-link d-block"
        }else{
          return isActive ? "active_link_board" : ""
        }
        // return isLinkHome ? "nav-link d-block" : isActive ? "nav-link d-block active_link_home" : !isLinkHome ? "" : isActive ? "active_link" : ""
      }}
      onClick={()=>handleChangeStylesLayout()}
    >
      {children}
    </NavLink>
  );
};

export default CustomLink;
