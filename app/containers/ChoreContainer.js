import Chore from '../components/Chore/Chore.js';
import { connect } from 'react-redux';

const mapStateToProps =  store => ({
  usersHouse: store.usersHouse
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Chore);
