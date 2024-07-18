import {CREATE_USER} from './actionType';

export const createUser = data => {
  return {
    type: CREATE_USER,
    payload: data,
  };
};
