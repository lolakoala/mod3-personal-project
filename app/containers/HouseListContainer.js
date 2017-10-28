import HouseList from '../components/HouseList/HouseList.js';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps =  store => ({
  usersHouse: store.usersHouse
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HouseList);
