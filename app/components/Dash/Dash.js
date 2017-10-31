import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../../firebase.js';
import JoinHouse from '../JoinHouse/JoinHouse.js';
import BillsList from '../BillsList/BillsList.js';
import BulletinsList from '../BulletinsList/BulletinsList.js';

class Dash extends Component {
  constructor() {
    super();
    this.state = {
      houseName: '',
      houseCode: '',
      allHouses: []
    };
  }

  componentDidMount () {
    const housesRef = firebase.database().ref('houses');
    housesRef.on('value', snapshot => {
      const houses = Object.entries(snapshot.val());
      const newState = houses.map(([key, value]) => Object.assign({ houseKey: key }, value));
      this.setState({ allHouses: newState });
    });
  }


  handleChange = (event, type) => {
    const { value } = event.target;
    this.setState({
      [type]: value
    });
  }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const usersHouse = this.state.allHouses.find(house => {
          if (house.users) {
            const userIds = house.users.map(user => user.id);
            return userIds.includes(user.uid);
          }
        });
        this.props.loginSuccess(user, usersHouse);
      });
  }

  createHouse = () => {
    const newHouse = Object.assign(
      {
        houseName: this.state.houseName,
        houseCode: this.state.houseCode,
        users: [this.props.currentUser],
        bills: [{ title: 'fake' }],
        bulletins: [{ title: 'fake' }],
        chores: [{ title: 'fake' }]
      });
    this.props.createHouse(newHouse);
  }

  getHouse = () => {
    const usersHouse = this.state.allHouses.find(house => {
      return house.houseCode === this.state.houseCode;
    });
    this.props.getHouse(this.props.currentUser, usersHouse);
  }

  renderDash = () => {
    const { usersHouse, currentUser, markBillPaid, addReaderToBulletin, match } = this.props;
    const { bills, bulletins } = this.props.usersHouse;
    return (
      <div>
        {(bills.length && bills[0].title !== 'fake') ?
          <BillsList usersHouse={usersHouse}
            currentUser={currentUser}
            markBillPaid={markBillPaid}
            placeRendered={match.url}/>
          : null }
        {(bulletins.length && bulletins[0].title !== 'fake') ?
          <BulletinsList usersHouse={usersHouse}
            currentUser={currentUser}
            addReaderToBulletin={addReaderToBulletin}
            placeRendered={match.url}/>
          : null}
      </div>
    );
  }

  getHouseOrDash = () => {
    return this.props.usersHouse.houseName ? this.renderDash() :
      <JoinHouse handleChange={this.handleChange}
        getHouse={this.getHouse}
        createHouse={this.createHouse}/>;
  }

  render() {
    return (
      <div>
        {this.props.currentUser.name ?
          this.getHouseOrDash()
          :
          <button onClick={this.login}>Log In</button>
        }
      </div>

    );
  }

}

export default Dash;

Dash.propTypes = {
  currentUser: PropTypes.object,
  loginSuccess: PropTypes.func,
  createHouse: PropTypes.func,
  usersHouse: PropTypes.object,
  getHouse: PropTypes.func,
  markBillPaid: PropTypes.func,
  addReaderToBulletin: PropTypes.func,
  match: PropTypes.object
};
