import Dash from '../components/Dash/Dash.js';
import { connect } from 'react-redux';
import {
  loginSuccess,
  createHouse,
  getHouse,
  addReaderToBulletin,
  markBillPaid,
  markChoreDone
} from '../actions/actions';

const mapStateToProps =  store => ({
  currentUser: store.currentUser,
  usersHouse: store.usersHouse
});

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (user, usersHouse) => {
    dispatch(loginSuccess(user, usersHouse));
  },
  createHouse: house => {
    dispatch(createHouse(house));
  },
  getHouse: (user, usersHouse) => {
    dispatch(getHouse(user, usersHouse));
  },
  addReaderToBulletin: (bulletinId, userId, usersHouse) => {
    dispatch(addReaderToBulletin(bulletinId, userId, usersHouse));
  },
  markBillPaid: (billId, userId, usersHouse) => {
    dispatch(markBillPaid(billId, userId, usersHouse));
  },
  markChoreDone: (chore, usersHouse) => {
    dispatch(markChoreDone(chore, usersHouse));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Dash);
