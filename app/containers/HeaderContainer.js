import Header from '../components/Header.jsx';
import { connect, bindActionCreators } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps =  store => ({
  user: store.currentUser,
  house: store.usersHouse
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
