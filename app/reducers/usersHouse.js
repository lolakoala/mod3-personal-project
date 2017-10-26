import firebase from '../firebase.js';

const usersHouse = (state = {}, action) => {
  const housesRef = firebase.database().ref('houses');
  switch (action.type) {
  case 'CREATE_HOUSE':
    housesRef.push(action.house);
    return action.house;
  case 'LOGIN_SUCCESS':
    return action.usersHouse;
  default:
    return state;
  }
};

export default usersHouse;
