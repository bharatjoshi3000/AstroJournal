import {CREATE_USER, IS_LOGGED_IN} from '../actions/actionType';

const initialState = {
  users: [],
  isLoggedIn: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      const tempUsers = [...state.users];
      console.log(tempUsers, 'tempUsers');
      tempUsers.push(action.payload);
      return {...state, users: tempUsers};

    case IS_LOGGED_IN:
      return {...state, isLoggedIn: action.payload};

    default:
      return state;
  }
};
