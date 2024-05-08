export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOG_OUT_USER = "LOG_OUT_USER";

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function proceedLogin(username, password) {
  return (dispatch, getState) => {
    const { users } = getState();
    const user = Object.values(users).find(
      (user) => user.id === username && user.password === password
    );
    if (user != null) {
      return dispatch(setAuthedUser(user.id));
    }
  };
}

export function proceedLogout() {
  return {
    type: LOG_OUT_USER,
  };
}
