import UserList from '../components/UserList/UserList.js';
import { connect, bindActionCreators } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps =  store => ({
  currentUser: store.currentUser,
  usersHouse: store.usersHouse
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
