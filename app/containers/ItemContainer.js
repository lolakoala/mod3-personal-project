import Item from '../components/Item/Item.js';
import { connect, bindActionCreators } from 'react-redux';
import * as actions from '../actions/actions.js';

const mapStateToProps =  store => ({
  usersHouse: store.usersHouse
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
