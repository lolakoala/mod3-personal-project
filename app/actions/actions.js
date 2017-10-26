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


export const loginSuccess = user => {
  let currentUser = Object.assign({}, {
    id: user.uid,
    name: user.displayName
  });
  return {
    type: 'LOGIN_SUCCESS',
    currentUser
  };
};
