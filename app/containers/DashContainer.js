import Dash from '../components/Dash/Dash.js';
import { connect } from 'react-redux';
import { loginSuccess, createHouse, getHouse } from '../actions/actions';

const mapStateToProps =  store => ({
  currentUser: store.currentUser,
  usersHouse: store.usersHouse
  // bulletins: store.bulletins,
  // bills: store.bills,
  // chores: store.chores
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
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Dash);
