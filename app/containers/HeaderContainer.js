import Header from '../components/Header/Header.js';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps =  store => ({
  currentUser: store.currentUser,
  usersHouse: store.usersHouse
});

const mapDispatchToProps = dispatch => {
  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
