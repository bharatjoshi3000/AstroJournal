import {CREATE_USER, IS_LOGGED_IN} from './actionType';

export const createUser = data => {
  return {
    type: CREATE_USER,
    payload: data,
  };
};

export const isUserLoggedIn = data => {
  return {
    type: IS_LOGGED_IN,
    payload: data,
  };
};
