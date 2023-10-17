export const PublicRoutes = {
  LOGIN: "login",
  ACCEPT_INVITATION_TO_WORKSPACE: "inviteTeam"
};

export const PrivateRoutes = {
  PRIVATE_HOME: "private_home",
  PRIVATE_WORKSPACE: "private_worspace",
  DASHBOARD: "dashboard",
  USUARIOS: "usuarios",
  WORKSAPCE: "workspace",
  BOARD: "board",
  TASKS: "tasks",
  SETTINGS:"settings",
  MEMBERS:"members",
  VIEWS:"views"
};

export const ChildActionsRoutes = {
  ADD: "crear",
  EDIT: "editar",
};


export const PrivateActionsRoutes = {
  WORKSAPCES: {
    ...ChildActionsRoutes,
    BOARD:"Tablero",
    LISTAR:"Listar"
  },
  BOARDS: {
    ...ChildActionsRoutes,
    CARD:"Tablero",
    TABLE:"Listar",
  },
  MEMBERS:{
    ...ChildActionsRoutes,
    LISTAR:"listar",
    PENDING:"pendientes"
  },
  TASKS: {
    ...ChildActionsRoutes,
    LISTAR:"listar"
  },
  WIEWS: {
    ...ChildActionsRoutes,
    LISTAR:"listar",
    TABLE:"table",
    CALENDAR:"calendar"
  },
}
