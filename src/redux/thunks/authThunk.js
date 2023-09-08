import {
  removeRefreshTokenCookie,
  removeTokenCookie,
  removeUserDataCookie,
  removeUserRolCookie,
  setRefreshTokenCookie,
  setTokenCookie,
  setUserDataCookie,
  setUserPermissionsCookie,
  setUserRolCookie,
} from "../../helpers/authCookies";
import { PrivateRoutes } from "../../routes";
import { loginService } from "../../services/authService";
import { setUser, setIsError, setLoading, setToken, setPermissions, setRol, setError } from "../slices/authSlice";

export const login = (data, navigate) => async (dispatch) => {
  dispatch(setLoading(true));

  const response = await loginService(data);
  if (response.code === 200) {
    const { permissions, user, role } = response.data;
    const {session, ...restUser} = user

    dispatch(setUser(restUser));
    dispatch(setToken(session));
    dispatch(setPermissions(permissions))
    dispatch(setRol(role))
    dispatch(setIsError(false));

    setTokenCookie(session);
    setUserDataCookie(restUser);
    setUserPermissionsCookie(permissions)
    setUserRolCookie(role)
    setRefreshTokenCookie(session);

    dispatch(setLoading(false));
    navigate(`/${PrivateRoutes.PRIVATE_HOME}/${PrivateRoutes.DASHBOARD}`);
  } else {
    const message = response.data
    dispatch(setUser({}));
    dispatch(setToken(""));
    dispatch(setPermissions({}))
    dispatch(setRol({}))
    dispatch(setIsError(true));
    dispatch(setError(message))
    dispatch(setLoading(false));
  }
};

export const logout = () => (dispatch) => {
  removeTokenCookie();
  removeUserDataCookie();
  removeRefreshTokenCookie();
  removeRefreshTokenCookie({})
  removeUserRolCookie({})
  dispatch(setUser({}));
  dispatch(setToken({}));
  dispatch(setIsError(false));
};
