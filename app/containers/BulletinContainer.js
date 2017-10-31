import Bulletin from '../components/Bulletin/Bulletin.js';
import { connect } from 'react-redux';

const mapStateToProps =  store => ({
  usersHouse: store.usersHouse
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Bulletin);
