import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddBulletin extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      details: ''
    };
  }

  handleChange(event, type) {
    const { value } = event.target;
    this.setState({
      [type]: value
    });
  }

  addBulletin = () => {
    const bulletin = {
      id: Date.now(),
      title: this.state.title,
      details: this.state.details,
      hasRead: [this.props.currentUser.id],
      postedBy: this.props.currentUser,
      datePosted: this.props.getTodaysDate()
    };

    this.props.addBulletin(bulletin, this.props.usersHouse);
    this.props.updateItem('');
  }

  render() {
    return (
      <div>
        <input type='text' placeholder='Title' onChange={(event) => this.handleChange(event, 'title')}/>
        <textarea type='text' placeholder='Details' onChange={(event) => this.handleChange(event, 'details')}/>
        <button onClick={() => this.addBulletin()}>Submit</button>
      </div>
    );
  }
}

export default AddBulletin;

AddBulletin.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  addBulletin: PropTypes.func,
  getTodaysDate: PropTypes.func,
  updateItem: PropTypes.func
};
