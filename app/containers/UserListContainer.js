import UserList from '../components/UserList.jsx';
import { connect, bindActionCreators } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps =  store => ({
  user: store.currentUser,
  house: store.usersHouse,
  bulletins: store.bulletins,
  bills: store.bills,
  chores: store.chores
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
