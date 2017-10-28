import AddItem from '../components/AddItem/AddItem.js';
import { connect, bindActionCreators } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps =  store => ({
  // user: store.currentUser,
  usersHouse: store.usersHouse
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
