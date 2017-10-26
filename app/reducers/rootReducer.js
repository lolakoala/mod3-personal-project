import { combineReducers } from 'redux';
import currentUser from './currentUser';
// import userStatus from './userStatus';
// import usersHouse from './usersHouse';
// import houseUsers from './houseUsers';
// import bills from './bills';
// import chores from './chores';
// import bulletins from './bulletins';
// import loginError from './loginError';
// import signupError from './signupError';
// import houseError from './houseError';

const rootReducer = combineReducers({
  currentUser
  // userStatus,
  // usersHouse,
  // houseUsers,
  // bills,
  // chores,
  // bulletins,
  // loginError,
  // signupError,
  // houseError
});

export default rootReducer;
