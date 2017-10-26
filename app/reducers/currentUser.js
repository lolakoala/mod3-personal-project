import firebase from '../firebase.js';

const currentUser = (state = {}, action) => {
  const usersRef = firebase.database().ref('users');
  let user;
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return action.currentUser;
  case 'CREATE_HOUSE':
    user = Object.assign(state, { house: action.house.houseName });
    usersRef.push(user);
    return user;
  default:
    return state;
  }
};

export default currentUser;
