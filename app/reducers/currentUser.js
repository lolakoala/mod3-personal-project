const currentUser = (state = {}, action) => {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return action.currentUser;
  default:
    return state;
  }
};

export default currentUser;
