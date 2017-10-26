import firebase from '../firebase.js';

const usersHouse = (state = {}, action) => {
  const housesRef = firebase.database().ref('houses');
  switch (action.type) {
  case 'CREATE_HOUSE':
    housesRef.push(action.house);
    return action.house;
  case 'GET_HOUSE':
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set({
      houseName: action.usersHouse.houseName,
      houseCode: action.usersHouse.houseCode,
      users: [...action.usersHouse.users, action.user.id]
    });
    return action.usersHouse;
  case 'LOGIN_SUCCESS':
    return action.usersHouse;
  case 'SIGNOUT':
    return {};
  case 'LEAVE_HOUSE':
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set({
      houseName: action.usersHouse.houseName,
      houseCode: action.usersHouse.houseCode,
      users: action.usersHouse.users.filter(user => user!== action.currentUser.id)
    });
    return {};
  default:
    return state;
  }
};

export default usersHouse;
