// import CustomLink from "../CustomLink";

import { useSelector } from "react-redux";
import ItemMenuGeneral from "./ItemMenuGeneral";
// import { useListBoardByWorkspace } from "../../../hooks/board/useListBoardByWorkspace";
import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { menuPermissions, validatePathInMenu } from "../../../utilsFunctions/auth";
import { createRoute, getIdParams } from "../../../utilsFunctions/generalFuntions";
import { Menu, typesMenu } from "../../../Menu";
import { PrivateRoutes } from "../../../routes";
import { DEFAULT_COLORS_LAYOUT } from "../../../utils/contants/colorsHex";
import { API_BASE_STORAGE } from "../../../services/settings";
import { useLazyGetBoardsByWorkspaceAndUserQuery } from "../../../rtkQuery/apiSliceBoard";
// import { setMenuHome, setMenuWorkspace } from "../../../redux/slices/menuSlice";
import { useStylesLayout } from "../../../hooks/layout/useStylesLayout";


const SiderbarGeneral = ({
  typeMenu,
  workspace,
  styleSiderbar,
  openMenu,
  // menuItems
}) => {

  const params = useParams()
  const location = useLocation()
  // const dispatch = useDispatch()
  const {
    setStylesLayout
  } = useStylesLayout()
  const [trigger, {
    isUninitialized
  }] = useLazyGetBoardsByWorkspaceAndUserQuery()

  const {permissions, user} = useSelector(state=>state.auth)
  const workspaceId = getIdParams(params)

  const [listMenu, setListMenu] = useState([])
  const [listBoardCurrentByWorkspace, setListBoardCurrentByWorkspace] = useState([])


  useEffect(()=>{

    const getListAsyncBoard = async()=>{
      try {
        const response = await trigger({idWorkspace:workspaceId, userId:user.id}).unwrap()
        const {data} = response
        if(Array.isArray(data))
          setListBoardCurrentByWorkspace(data)

      } catch (error) {
        console.log("error")
      }
    }

    if(isUninitialized && typesMenu.WOKSPACE === typeMenu) getListAsyncBoard()

  },[isUninitialized, workspaceId, user.id, trigger, typeMenu])

  useEffect(()=>{
    let currentRoute = null
    let menu = [...Menu]


    const stylesLayout = (styles={})=>({
      ...DEFAULT_COLORS_LAYOUT,
      ...styles
    })

    if(listBoardCurrentByWorkspace.length > 0 && typesMenu.WOKSPACE === typeMenu){
      menu = Menu.map(itemMenu=>{
        const item = {...itemMenu}

        if(PrivateRoutes.BOARD && item?.isAsync){
          const subroutes = listBoardCurrentByWorkspace.map(board=>{

            const styles = {
              board:{
                header:{
                  backgroundColor:`${board.bg_color}a5`,
                  color:"#44546f"
                }
              },
              content:{
                backgroundColor:board.bg_color,
                ...(board?.bg_img ?  {backgroundImage:`url(${API_BASE_STORAGE}${board.bg_img})`}: {})
              }
            }

            const path = `${board.id}/${PrivateRoutes.BOARD}`

            return createRoute({
              name:board.name,
              path,
              isShowInSidebar:true,
              isAsync:false,
              permission:PrivateRoutes.BOARD,
              stylesLayout:stylesLayout(styles)
            })
          })

          if(item?.subroutes){
            item.subroutes = [...subroutes]
          }
        }

        return item

      })
    }

    setListMenu(menuPermissions(menu,permissions))

    if(typesMenu.WOKSPACE === typeMenu && workspace?.id){
      currentRoute = validatePathInMenu(menu,`${PrivateRoutes.PRIVATE_WORKSPACE}/${workspace?.id}`, location.pathname)
      // dispatch(setMenuWorkspace(mapMenuWithoutIcon(menu)))
    }

    if(typesMenu.HOME === typeMenu){
      currentRoute = validatePathInMenu(menu,`${PrivateRoutes.PRIVATE_HOME}`, location.pathname)
      // dispatch(setMenuHome(mapMenuWithoutIcon(menu)))
    }

    if(currentRoute) setStylesLayout(currentRoute.stylesLayout)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[Menu, permissions, listBoardCurrentByWorkspace, workspace])

  return (
    <React.Fragment>
      <div className="general-siderbar">
      <div
        className="flex-column menu-sidebar"
        style={{backgroundColor:styleSiderbar.backgroundColor}}
      >
        <div className="list-menu-sidebar m-3">
          <ul className="list-unstyled">

            {
              listMenu.map((item,id)=>(
                item?.isShowInSidebar && item?.type === typeMenu  && (
                  <ItemMenuGeneral
                    styleSiderbar={styleSiderbar}
                    stylesLayoutItem={item.stylesLayout}
                    workspace={workspace}
                    typeMenu={typeMenu}
                    key={id}
                    name={item.name}
                    icon={item.icon}
                    id={id}
                    path={item.path}
                    subroutes={item?.subroutes}
                  />
                )
              ))
            }

          </ul>
        </div>
      </div>
    </div>
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
              listMenu.map((item,id)=>(
                item?.isShowInSidebar && item?.type === typeMenu && (
                  <ItemMenuGeneral
                    styleSiderbar={styleSiderbar}
                    stylesLayoutItem={{...item.content,...item.header,...item.siderbar}}
                    typeMenu={typeMenu}
                    key={id}
                    workspace={workspace}
                    name={item.name}
                    icon={item.icon}
                    path={item.path}
                    subroutes={item?.subroutes}
                  />
                )
              ))
            }
          </ul>
        </div>
      </div>
    </div>
    </React.Fragment>

  );
};

export default SiderbarGeneral;
