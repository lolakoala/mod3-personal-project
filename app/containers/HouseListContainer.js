import HouseList from '../components/HouseList/HouseList.js';
import { connect } from 'react-redux';
import { addReaderToBulletin, markChoreDone, claimChore, markBillPaid } from '../actions/actions.js';

const mapStateToProps =  store => ({
  usersHouse: store.usersHouse,
  currentUser: store.currentUser
});

const mapDispatchToProps = dispatch => ({
  addReaderToBulletin: (bulletinId, userId, usersHouse) => {
    dispatch(addReaderToBulletin(bulletinId, userId, usersHouse));
  },
  markChoreDone: (chore, usersHouse) => {
    dispatch(markChoreDone(chore, usersHouse));
  },
  claimChore: (userId, chore, usersHouse) => {
    dispatch(claimChore(userId, chore, usersHouse));
  },
  markBillPaid: (billId, userId, usersHouse) => {
    dispatch(markBillPaid(billId, userId, usersHouse));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HouseList);
