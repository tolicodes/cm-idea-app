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
  return GET('/access-tokens', data);
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

export function logOut() {
  return DELETE('/access-tokens');
}
