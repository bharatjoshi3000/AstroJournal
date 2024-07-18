import {CREATE_USER} from '../actions/actionType';

const initialState = {
  users: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      console.log('isITCOMING1');
      //   const tempUsers = Object.assign({}, state.users);
      const tempUsers = [...state.users];
      console.log(tempUsers, 'tempUsers');
      tempUsers.push(action.payload);
      return {...state, users: tempUsers};

    default:
      return state;
  }
};
