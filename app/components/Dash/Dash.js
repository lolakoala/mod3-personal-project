import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from '../../firebase.js';

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
      let houses = snapshot.val();
      let newState = [];
      for (let house in houses) {
        newState.push({
          houseName: houses[house].houseName,
          houseCode: houses[house].houseCode,
          users: houses[house].users
        });
      }
      this.setState({ allHouses: newState });
    });
  }


  handleChange(event, type) {
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
          return house.users.includes(user.uid);
        });
        this.props.loginSuccess(user, usersHouse);
      });
  }

  createHouse = () => {
    this.props.createHouse(Object.assign(
      { houseName: this.state.houseName,
        houseCode: this.state.houseCode,
        users: [this.props.currentUser.id] }));
  }

  renderDash () {
    const dash = <p>Dash</p>;
    const invokeHouse = <div>
      <input type="text"
        placeholder="House Name"
        onChange={ (event) => this.handleChange(event, 'houseName' ) }/>
      <input type="text"
        placeholder="House Code"
        onChange={ (event) => this.handleChange(event, 'houseCode' ) }/>
      <button
        onClick={this.createHouse}>
          Add My House
      </button>
    </div>;
    return this.props.usersHouse.houseName ? dash : invokeHouse;
  }

  render() {
    return (
      <div>
        {this.props.currentUser.name ?
          this.renderDash()
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
  createHouse: PropTypes.func
};
