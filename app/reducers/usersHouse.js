import firebase from '../firebase.js';

const usersHouse = (state = {}, action) => {
  const housesRef = firebase.database().ref('houses');
  switch (action.type) {
  case 'CREATE_HOUSE':
    housesRef.push(action.house);
    return action.house;
  case 'GET_HOUSE':
    const updatedHouse = Object.assign(action.usersHouse, { users: [...action.usersHouse.users, action.user] });
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set(updatedHouse);
    return updatedHouse;
  case 'LOGIN_SUCCESS':
    return action.usersHouse;
  case 'SIGNOUT':
    return {};
  case 'LEAVE_HOUSE':
    const deleteUser = action.usersHouse.users.filter(user => user.id !== action.currentUser.id);
    const houseWithoutUser = Object.assign(action.usersHouse, { users: deleteUser });
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set(houseWithoutUser);
    return {};
  case 'ADD_BILL':
    const takeOutFakeBills = action.usersHouse.bills.filter(bill => bill.title !== 'fake');
    const houseWithBill = Object.assign(action.usersHouse, { bills: [...takeOutFakeBills, action.bill] });
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set(houseWithBill);
    return houseWithBill;
  case 'ADD_BULLETIN':
    const takeOutFakeBulletins = action.usersHouse.bulletins.filter(bulletin => bulletin.title !== 'fake');
    const houseWithBulletin = Object.assign(action.usersHouse, { bulletins: [...takeOutFakeBulletins, action.bulletin] });
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set(houseWithBulletin);
    return houseWithBulletin;
  case 'ADD_CHORE':
    const takeOutFakeChore = action.usersHouse.chores.filter(chore => chore.title !== 'fake');
    const houseWithChore = Object.assign(action.usersHouse, { chores: [...takeOutFakeChore, action.chore] });
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set(houseWithChore);
    return houseWithChore;
  case 'ADD_READER':
    const oldBulletin = action.usersHouse.bulletins.find(bulletin => bulletin.id === action.bulletinId);
    if (oldBulletin.hasRead.includes(action.userId)) {
      return action.usersHouse;
    }
    const newBulletin = Object.assign(oldBulletin, { hasRead: [...oldBulletin.hasRead, action.userId] });
    const updateBulletins = action.usersHouse.bulletins.filter(bulletin => {
      return bulletin.id !== action.bulletinId;
    });
    const updateWithBulletin = Object.assign(action.usersHouse, { bulletins: [...updateBulletins, newBulletin] });
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set(updateWithBulletin);
    return updateWithBulletin;
  case 'MARK_PAID':
    const oldBill = action.usersHouse.bills.find(bill => bill.id === action.billId);
    const user = oldBill.allUsersTotals.find(user => user.id === action.userId);
    if (user.paid === true) {
      return action.usersHouse;
    }
    const newUser = Object.assign(user, { paid: true });
    const newAllUsersTotals = oldBill.allUsersTotals.filter(user => user.id !== action.userId);
    const newBill = Object.assign(oldBill, { allUsersTotals: [...newAllUsersTotals, newUser] });
    const updatedBills = action.usersHouse.bills.filter(bill => {
      return bill.id !== action.billId;
    });
    const updateWithBill = Object.assign(action.usersHouse, { bills: [...updatedBills, newBill] });
    firebase.database().ref("houses/" + action.usersHouse.houseKey).set(updateWithBill);
    return updateWithBill;
  default:
    return state;
  }
};

export default usersHouse;
