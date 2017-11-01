import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddBulletin extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      details: '',
      submitDisabled: true
    };
  }

  handleChange(event, type) {
    const { value } = event.target;
    if (type === 'title' && value.length) {
      this.setState({ [type]: value, submitDisabled: false });
    } else {
      this.setState({ [type]: value });
    }
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

  reset = () => {
    document.querySelector('.bulletin-input').value = "";
    const newState = {
      title: '',
      details: ''
    };
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <input className='bulletin-input' type='text' placeholder='Title' onChange={(event) => this.handleChange(event, 'title')}/>
        <textarea className='bulletin-input' type='text' placeholder='Details' onChange={(event) => this.handleChange(event, 'details')}/>
        <button onClick={() => this.addBulletin()} disabled={this.state.submitDisabled}>Submit</button>
        <button onClick={this.reset}>Reset</button>
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
