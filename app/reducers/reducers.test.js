import currentUserReducer from './currentUser.js';
import usersHouseReducer from './usersHouse.js';
import currentUser1 from '../mockData/currentUser1.js';
import usersHouse from '../mockData/usersHouse.js';

describe('currentUserReducer', () => {
  it('should have a default state', () => {
    expect(currentUserReducer(undefined, {})).toEqual({});
  });

  it('should give a user for login success', () => {
    const action = {
      type: 'LOGIN_SUCCESS',
      currentUser: currentUser1
    };

    expect(currentUserReducer(undefined, action)).toEqual(currentUser1);
  });

  it('should give a user for create house', () => {
    const action = {
      type: 'CREATE_HOUSE',
      house: usersHouse
    };

    expect(currentUserReducer(currentUser1, action)).toEqual(currentUser1);
  });

  it('should give a user for get house', () => {
    const action = {
      type: 'GET_HOUSE',
      usersHouse: usersHouse
    };

    expect(currentUserReducer(currentUser1, action)).toEqual(currentUser1);
  });

  it('should give an empty object for signout', () => {
    const action = { type: 'SIGNOUT' };

    expect(currentUserReducer(undefined, action)).toEqual({});
  });

  it('should give a user for leave house', () => {
    const action = {
      type: 'LEAVE_HOUSE',
      currentUser: currentUser1
    };
    const user = Object.assign(currentUser1, { house: {} });

    expect(currentUserReducer(undefined, action)).toEqual(user);
  });
});

describe('usersHouseReducer', () => {
  it('should have a default state', () => {
    expect(usersHouseReducer(undefined, {})).toEqual({});
  });

  it('should give a house for create house', () => {
    const action = {
      type: 'CREATE_HOUSE',
      house: usersHouse
    };

    expect(usersHouseReducer(undefined, action)).toEqual(usersHouse);
  });

  it('should give a house for get house', () => {
    const action = {
      type: 'GET_HOUSE',
      usersHouse: usersHouse,
      user: currentUser1
    };
    const newHouse = Object.assign(action.usersHouse, { users: [...action.usersHouse.users, action.user] });

    expect(usersHouseReducer(undefined, action)).toEqual(newHouse);
  });

  it('should give a house for login success', () => {
    const action = {
      type: 'LOGIN_SUCCESS',
      usersHouse: usersHouse
    };

    expect(usersHouseReducer(undefined, action)).toEqual(usersHouse);
  });

  it('should give an empty object for signout', () => {
    const action = { type: 'SIGNOUT' };

    expect(usersHouseReducer(undefined, action)).toEqual({});
  });

  it('should give an empty house for leave house', () => {
    const action = {
      type: 'LEAVE_HOUSE',
      usersHouse: usersHouse,
      currentUser: currentUser1
    };

    expect(usersHouseReducer(undefined, action)).toEqual({});
  });
});
