import {
  GET,
  POST,
  DELETE,
} from '../api';

/*
 data = {
  email,
  password,
 }
 */
export function logIn (data) {
  return POST('/access-tokens', data);
}

/*
 data = {
  email,
  password,
  name
 }
 */
export function register(data) {
  return POST('/users', data);
}

export function logOut(refresh_token) {
  return DELETE('/access-tokens', { refresh_token });
}

export function refreshToken(refresh_token) {
  return POST('/access-tokens/refresh', {
    refresh_token,
  });
}

export function getMe() {
  return GET('/me');
}
