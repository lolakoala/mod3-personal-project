import Chore from '../components/Chore/Chore.js';
import { connect } from 'react-redux';
import { markChoreDone, claimChore } from '../actions/actions.js';

const mapStateToProps =  store => ({
  usersHouse: store.usersHouse,
  currentUser: store.currentUser
});

const mapDispatchToProps = dispatch => ({
  markChoreDone: (chore, usersHouse) => {
    dispatch(markChoreDone(chore, usersHouse));
  },
  claimChore: (userId, chore, usersHouse) => {
    dispatch(claimChore(userId, chore, usersHouse));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Chore);
