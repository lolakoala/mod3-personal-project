import Dash from '../components/Dash/Dash.js';
import { connect } from 'react-redux';
import { loginSuccess } from '../actions/actions';

const mapStateToProps =  store => ({
  // user: store.currentUser
  // house: store.usersHouse,
  // bulletins: store.bulletins,
  // bills: store.bills,
  // chores: store.chores
});

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: user => {
    dispatch(loginSuccess(user));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Dash);
