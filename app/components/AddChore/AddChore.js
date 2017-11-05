import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Chore extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      details: '',
      assignedTo: '',
      urgency: '',
      done: false,
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

  assignToSelf = userId => {
    this.state.assignedTo === userId ? this.setState({ assignedTo: '' }) : this.setState({ assignedTo: userId });
  }

  addChore = () => {
    const chore = {
      title: this.state.title,
      details: this.state.details,
      assignedTo: this.state.assignedTo,
      urgency: this.state.urgency,
      id: `c${Date.now()}`,
      postedBy: this.props.currentUser,
      datePosted: this.props.getTodaysDate(),
      done: this.state.done
    };
    this.props.addChore(chore, this.props.usersHouse);
    this.props.updateItem('');
  }

  toggleDone = () => {
    this.state.done === false ? this.setState({ done: true }) : this.setState({ done: false });
  }

  reset = () => {
    document.querySelector('.chore-input').value = "";
    const newState = {
      title: '',
      details: ''
    };
    this.setState(newState);
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className='add-chore'>
        <div className='add-chore-inputs'>
          <input className='chore-input' type='text' placeholder='Title' onChange={event => this.handleChange(event, 'title')}/>
          <textarea className='chore-input' type='text' placeholder='Details' onChange={event => this.handleChange(event, 'details')}/>
        </div>
        <div className='add-chore-buttons'>
          <div className='checkbox'>
            <input type='checkbox' id='selfassign' onChange={() => this.assignToSelf(currentUser.id)}/>
            <label htmlFor='selfassign'>Claim for Self</label>
          </div>
          <div className='checkbox'>
            <input type='checkbox' id='alreadyDone' onChange={() => this.toggleDone()}/>
            <label htmlFor='alreadyDone'>Already Done</label>
          </div>
          <div className='checkbox'>
            <input className='high-urgency' type="checkbox" id="high-urgency"
              name="urgency" value="high" onChange={event => this.handleChange(event, 'urgency')}/>
            <label htmlFor="high-urgency">Urgent</label>
          </div>
          <button onClick={() => this.addChore()} disabled={this.state.submitDisabled}>Submit</button>
          <button onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Chore;

Chore.propTypes = {
  currentUser: PropTypes.object,
  usersHouse: PropTypes.object,
  addChore: PropTypes.func,
  getTodaysDate: PropTypes.func,
  updateItem: PropTypes.func
};
