import * as actions from './actions.js';
import currentUser2 from '../mockData/currentUser2.js';
import usersHouse from '../mockData/usersHouse.js';

describe('actions', () => {
  it('should create an action for login success', () => {
    const expectedAction = {
      type: 'LOGIN_SUCCESS',
      currentUser: currentUser2,
      usersHouse: usersHouse
    };

    const user = {
      uid: currentUser2.id,
      displayName: currentUser2.name,
      house: usersHouse.houseName
    };

    expect(actions.loginSuccess(user, usersHouse)).toEqual(expectedAction);
  });

  it('should create an action for create House', () => {
    const expectedAction = {
      type: 'CREATE_HOUSE',
      house: usersHouse
    };

    expect(actions.createHouse(usersHouse)).toEqual(expectedAction);
  });

  it('should create an action for get house', () => {
    const expectedAction = {
      type: 'GET_HOUSE',
      user: currentUser2,
      usersHouse: usersHouse
    };

    expect(actions.getHouse(currentUser2, usersHouse)).toEqual(expectedAction);
  });

  it('should create an action for signout', () => {
    const expectedAction = {
      type: 'SIGNOUT'
    };

    expect(actions.signOut()).toEqual(expectedAction);
  });

  it('should create an action for leave house', () => {
    const expectedAction = {
      type: 'LEAVE_HOUSE',
      currentUser: currentUser2,
      usersHouse: usersHouse
    };

    expect(actions.leaveHouse(currentUser2, usersHouse)).toEqual(expectedAction);
  });

  it('should create an action for add bill', () => {
    const expectedAction = {
      type: 'ADD_BILL',
      bill: usersHouse.bills[0],
      usersHouse: usersHouse
    };

    expect(actions.addBill(usersHouse.bills[0], usersHouse)).toEqual(expectedAction);
  });

  it('should create an action for add bulletin', () => {
    const expectedAction = {
      type: 'ADD_BULLETIN',
      bulletin: usersHouse.bulletins[0],
      usersHouse: usersHouse
    };

    expect(actions.addBulletin(usersHouse.bulletins[0], usersHouse)).toEqual(expectedAction);
  });

  it('should create an action for add chore', () => {
    const expectedAction = {
      type: 'ADD_CHORE',
      chore: usersHouse.chores[0],
      usersHouse: usersHouse
    };

    expect(actions.addChore(usersHouse.chores[0], usersHouse)).toEqual(expectedAction);
  });

  it('should create an action for add reader to bulletin', () => {
    const bulletinId = usersHouse.bulletins[0].id;

    const expectedAction = {
      type: 'ADD_READER',
      bulletinId: bulletinId,
      userId: currentUser2.id,
      usersHouse: usersHouse
    };

    expect(actions.addReaderToBulletin(bulletinId, currentUser2.id, usersHouse)).toEqual(expectedAction);
  });

  it('should create an action for mark bill paid', () => {
    const billId = usersHouse.bills[0].id;

    const expectedAction = {
      type: 'MARK_PAID',
      billId: billId,
      userId: currentUser2.id,
      usersHouse: usersHouse
    };

    expect(actions.markBillPaid(billId, currentUser2.id, usersHouse)).toEqual(expectedAction);
  });

  it('should create action for mark chore done', () => {
    const expectedAction = {
      type: 'MARK_DONE',
      chore: usersHouse.chores[0],
      usersHouse: usersHouse
    };

    expect(actions.markChoreDone(usersHouse.chores[0], usersHouse)).toEqual(expectedAction);
  });

  it('should create action for claim chore', () => {
    const expectedAction = {
      type: 'CLAIM',
      userId: currentUser2.id,
      chore: usersHouse.chores[0],
      usersHouse: usersHouse
    };

    expect(actions.claimChore(currentUser2.id, usersHouse.chores[0], usersHouse)).toEqual(expectedAction);
  });
});
