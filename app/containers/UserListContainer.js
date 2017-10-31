import UserList from '../components/UserList/UserList.js';
import { connect } from 'react-redux';
import { addReaderToBulletin } from '../actions/actions.js';

const mapStateToProps =  store => ({
  currentUser: store.currentUser,
  usersHouse: store.usersHouse
});

const mapDispatchToProps = dispatch => ({
  addReaderToBulletin: (bulletinId, userId, usersHouse) => {
    dispatch(addReaderToBulletin(bulletinId, userId, usersHouse));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
