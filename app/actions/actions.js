import firebase from '../firebase.js';


// actions to ...
// create user
// log in
// create house
// join house
// add bulletin
// add chore
// alter chore
// add bill
// alter bill


export const loginSuccess = (user, usersHouse = {}) => {
  let currentUser = Object.assign({}, {
    id: user.uid,
    name: user.displayName
  });
  return {
    type: 'LOGIN_SUCCESS',
    currentUser,
    usersHouse
  };
};

export const createHouse = house => {
  return {
    type: 'CREATE_HOUSE',
    house
  };
};

export const getHouse = (user, usersHouse) => {
  return {
    type: 'GET_HOUSE',
    user,
    usersHouse
  };
};

export const signOut = () => {
  return {
    type: 'SIGNOUT'
  };
};

export const leaveHouse = (currentUser, usersHouse) => {
  return {
    type: 'LEAVE_HOUSE',
    currentUser,
    usersHouse
  };
};
