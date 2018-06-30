export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const DO_LOGIN = 'DO_LOGIN';
export const DO_LOGOUT = 'DO_LOGOUT';
export const DO_REGISTER = 'DO_REGISTER';
export const SET_ME = 'SET_ME';

// loggedIn can be true or false. Sets if user is logged in
export function setLoggedIn(loggedIn) {
  return { type: SET_LOGGED_IN, loggedIn };
}

/*
 data: {
  email,
  password
 }
 */
export function doLogin(data) {
  return { type: DO_LOGIN, data };
}

/*
 data: {
  email,
  password,
  name
 }
 */
export function doRegister(data) {
  return { type: DO_REGISTER, data };
}

export function doLogout() {
  return { type: DO_LOGOUT };
}

export function setMe(user) {
  return { type: SET_ME, user };
}
