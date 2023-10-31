import { PrivateActionsRoutes, PrivateRoutes } from "./routes";
import { DEFAULT_COLORS_LAYOUT } from "./utils/contants/colorsHex";
import { BoardIcon, DashboardIcon, ListIcon, MembersIcon, SettingsIcon, ViewsIcon } from "./utils/icons/iconsMenu";


// eslint-disable-next-line react-refresh/only-export-components
export const typesMenu = {
  HOME:"HOME",
  WOKSPACE:"WOKSPACE",
  // BOARD:"BOARD",
}

export const typesCards = {
  STAGE:"STAGE",
  FEATURE:"FEATURE"
}

// const LISTAR_TASKS = "listar_tasks";
// const CREAR_TASKS = "crear_tasks"

/*
  subpermissions workspace - Types views
*/
const TABLE = "table"
const CALENDAR = "calendar"

// const LIST_BOARDS_BY_WORSPACE = "list_boards_by_worspace"

/*
  BOARD - Types views
*/

/*
  TYPES MENU
*/


export const Menu = [
  {
    name: "Dashboard",
    icon: (fill)=><DashboardIcon fill={fill}/>,
    path: PrivateRoutes.DASHBOARD,
    isShowInSidebar: true,
    type:typesMenu.HOME,
    permission: PrivateRoutes.DASHBOARD,
    stylesLayout:DEFAULT_COLORS_LAYOUT
  },
  {
    name: "Tableros",
    icon: (fill)=><BoardIcon fill={fill}/>,
    path: PrivateRoutes.BOARD,
    type:typesMenu.HOME,
    isShowInSidebar: true,
    permission: PrivateRoutes.BOARD,
    stylesLayout:DEFAULT_COLORS_LAYOUT

  },
  // {
  //   name: "Workspace 1",
  //   icon: (fill)=><WorkspaceIcon fill={fill}/>,
  //   path: PrivateRoutes.WORKSAPCE,
  //   type:typesMenu.HOME,
  //   isShowInSidebar: true,
  //   permission: PrivateRoutes.WORKSAPCE,
  //   stylesLayout:DEFAULT_COLORS_LAYOUT,
  //   subroutes: [
  //     {
  //       name: "Tableros",
  //       path: PrivateRoutes.WORKSAPCE + "/" + PrivateActionsRoutes.WORKSAPCES.BOARD,
  //       isShowInSidebar: true,
  //       permission: "BOARD",
  //     },
  //     {
  //       name: "Configuracion",
  //       path: PrivateRoutes.WORKSAPCE + "/" + PrivateActionsRoutes.WORKSAPCES.SETTING,
  //       isShowInSidebar: true,
  //       permission: "SETTING",
  //     },
  //     {
  //       name: "Miembros",
  //       path: PrivateRoutes.WORKSAPCE + "/" + PrivateActionsRoutes.WORKSAPCES.MEMBERS,
  //       isShowInSidebar: true,
  //       permission: "MEMBERS",
  //     },

  //   ],
  // },
  // ITEMS SIDERBAR WORSPACE
  {
    name: "Tableros",
    icon: (fill)=><BoardIcon fill={fill}/>,
    // path: ":workspaceId" + "/" + PrivateActionsRoutes.WORKSAPCES.LISTAR,
    path: PrivateActionsRoutes.WORKSAPCES.LISTAR,
    type:typesMenu.WOKSPACE,
    isShowInSidebar: true,
    permission: PrivateRoutes.WORKSAPCE,
    stylesLayout:DEFAULT_COLORS_LAYOUT
  },
  {
    name: "Miembros",
    icon: (fill)=><MembersIcon fill={fill}/>,
    path: PrivateRoutes.MEMBERS,
    type:typesMenu.WOKSPACE,
    isShowInSidebar: true,
    permission: PrivateRoutes.MEMBERS,
    stylesLayout:DEFAULT_COLORS_LAYOUT

  },
  {
    name: "Configuración",
    icon: (fill)=><SettingsIcon fill={fill}/>,
    path: PrivateRoutes.SETTINGS,
    type:typesMenu.WOKSPACE,
    isShowInSidebar: true,
    permission: PrivateRoutes.SETTINGS,
    stylesLayout:DEFAULT_COLORS_LAYOUT

  },
  {
    name: "Modos de vista",
    icon: (fill)=><ViewsIcon fill={fill}/>,
    path: PrivateRoutes.VIEWS,
    type:typesMenu.WOKSPACE,
    isShowInSidebar: true,
    permission: PrivateRoutes.VIEWS,
    stylesLayout:DEFAULT_COLORS_LAYOUT,
    subroutes: [
      {
        name: "Tabla",
        path: PrivateRoutes.VIEWS + "/" + PrivateActionsRoutes.WIEWS.TABLE,
        isShowInSidebar: true,
        isAsync:false,
        permission: TABLE,
        ...DEFAULT_COLORS_LAYOUT

      },
      {
        name: "Calendario",
        path: PrivateRoutes.TASKS + "/" + PrivateActionsRoutes.WIEWS.CALENDAR,
        isShowInSidebar: true,
        isAsync:false,
        permission: CALENDAR,
        ...DEFAULT_COLORS_LAYOUT

      },
    ],
  },
  {
    name: "Sus tableros",
    icon: (fill)=><BoardIcon fill={fill}/>,
    path: PrivateRoutes.BOARD,
    isShowInSidebar: true,
    type:typesMenu.WOKSPACE,
    permission: PrivateRoutes.BOARD,
    isAsync:true,
    stylesLayout:DEFAULT_COLORS_LAYOUT,
    subroutes: []
  },
]

export const typesViewBoards = [
  {
    id: PrivateActionsRoutes.BOARDS.CARD,
    name: PrivateActionsRoutes.BOARDS.CARD,
    icon: (fill) => <BoardIcon fill={fill} />,
  },
  {
    id: PrivateActionsRoutes.BOARDS.TABLE,
    name: PrivateActionsRoutes.BOARDS.TABLE,
    icon: (fill) => <ListIcon fill={fill} />,
  },
]




// export const MenuItemsHome = [
//   {
//     name: "Dashboard",
//     icon: (fill)=><DashboardIcon fill={fill}/>,
//     path: PrivateRoutes.DASHBOARD,
//     isShowInSidebar: true,
//     type:typesMenu.HOME,
//     permission: PrivateRoutes.DASHBOARD,
//     stylesLayout:DEFAULT_COLORS_LAYOUT
//   },
//   {
//     name: "Tableros",
//     icon: (fill)=><BoardIcon fill={fill}/>,
//     path: PrivateRoutes.BOARD,
//     type:typesMenu.HOME,
//     isShowInSidebar: true,
//     permission: PrivateRoutes.BOARD,
//     stylesLayout:DEFAULT_COLORS_LAYOUT

//   },
//   {
//     name: "Workspace 1",
//     icon: (fill)=><WorkspaceIcon fill={fill}/>,
//     path: PrivateRoutes.WORKSAPCE,
//     type:typesMenu.HOME,
//     isShowInSidebar: true,
//     permission: PrivateRoutes.WORKSAPCE,
//     stylesLayout:DEFAULT_COLORS_LAYOUT,
//     subroutes: [
//       {
//         name: "Tableros",
//         path: PrivateRoutes.WORKSAPCE + "/" + PrivateActionsRoutes.WORKSAPCES.BOARD,
//         isShowInSidebar: true,
//         permission: "BOARD",
//       },
//       {
//         name: "Configuracion",
//         path: PrivateRoutes.WORKSAPCE + "/" + PrivateActionsRoutes.WORKSAPCES.SETTING,
//         isShowInSidebar: true,
//         permission: "SETTING",
//       },
//       {
//         name: "Miembros",
//         path: PrivateRoutes.WORKSAPCE + "/" + PrivateActionsRoutes.WORKSAPCES.MEMBERS,
//         isShowInSidebar: true,
//         permission: "MEMBERS",
//       },

//     ],
//   },
// ]

// export const MenuWorkspace = [
//   {
//     name: "Tableros",
//     icon: (fill)=><BoardIcon fill={fill}/>,
//     // path: ":workspaceId" + "/" + PrivateActionsRoutes.WORKSAPCES.LISTAR,
//     path: PrivateActionsRoutes.WORKSAPCES.LISTAR,
//     type:typesMenu.HOME,
//     isShowInSidebar: true,
//     permission: PrivateRoutes.WORKSAPCE,
//     stylesLayout:DEFAULT_COLORS_LAYOUT
//   },
//   {
//     name: "Miembros",
//     icon: (fill)=><MembersIcon fill={fill}/>,
//     path: PrivateRoutes.MEMBERS,
//     type:typesMenu.HOME,
//     isShowInSidebar: true,
//     permission: PrivateRoutes.MEMBERS,
//     stylesLayout:DEFAULT_COLORS_LAYOUT

//   },
//   {
//     name: "Configuración",
//     icon: (fill)=><SettingsIcon fill={fill}/>,
//     path: PrivateRoutes.SETTINGS,
//     type:typesMenu.HOME,
//     isShowInSidebar: true,
//     permission: PrivateRoutes.SETTINGS,
//     stylesLayout:DEFAULT_COLORS_LAYOUT

//   },
//   {
//     name: "Modos de vista",
//     icon: (fill)=><ViewsIcon fill={fill}/>,
//     path: PrivateRoutes.VIEWS,
//     type:typesMenu.HOME,
//     isShowInSidebar: true,
//     permission: PrivateRoutes.VIEWS,
//     stylesLayout:DEFAULT_COLORS_LAYOUT,
//     subroutes: [
//       {
//         name: "Tabla",
//         path: PrivateRoutes.VIEWS + "/" + PrivateActionsRoutes.WIEWS.TABLE,
//         isShowInSidebar: true,
//         isAsync:false,
//         permission: TABLE,
//         ...DEFAULT_COLORS_LAYOUT

//       },
//       {
//         name: "Calendario",
//         path: PrivateRoutes.TASKS + "/" + PrivateActionsRoutes.WIEWS.CALENDAR,
//         isShowInSidebar: true,
//         isAsync:false,
//         permission: CALENDAR,
//         ...DEFAULT_COLORS_LAYOUT

//       },
//     ],
//   },
//   {
//     name: "Sus tableros",
//     icon: (fill)=><BoardIcon fill={fill}/>,
//     path: PrivateRoutes.BOARD,
//     isShowInSidebar: true,
//     type:typesMenu.HOME,
//     permission: PrivateRoutes.BOARD,
//     isAsync:true,
//     stylesLayout:DEFAULT_COLORS_LAYOUT,
//     subroutes: []
//   },
// ];
