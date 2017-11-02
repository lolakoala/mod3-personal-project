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
    if ((type === 'title' && value.length) && this.state.urgency.length) {
      this.setState({ [type]: value, submitDisabled: false });
    } else if (type === 'urgency' && this.state.title.length) {
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

  renderUrgency = () => {
    return (
      <div>
        <p>Select Urgency:</p>
        <input className='high-urgency' type="radio" id="high-urgency"
          name="urgency" value="high" onChange={event => this.handleChange(event, 'urgency')}/>
        <label htmlFor="high-urgency">High</label>
        <input className='medium-urgency' type="radio" id="medium-urgency"
          name="urgency" value="medium" onChange={event => this.handleChange(event, 'urgency')}/>
        <label htmlFor="medium-urgency">Medium</label>
        <input className='low-urgency' type="radio" id="low-urgency"
          name="urgency" value="low" onChange={event => this.handleChange(event, 'urgency')}/>
        <label htmlFor="low-urgency">Low</label>
      </div>
    );
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
      <div>
        <input className='chore-input' type='text' placeholder='Title' onChange={event => this.handleChange(event, 'title')}/>
        <textarea className='chore-input' type='text' placeholder='Details' onChange={event => this.handleChange(event, 'details')}/>
        <input type='checkbox' id='selfassign' onChange={() => this.assignToSelf(currentUser.id)}/>
        <label htmlFor='selfassign'>Claim for Self</label>
        <input type='checkbox' id='alreadyDone' onChange={() => this.toggleDone()}/>
        <label htmlFor='alreadyDone'>Already Done</label>
        {this.state.done === false ? this.renderUrgency() : null}
        <button onClick={() => this.addChore()} disabled={this.state.submitDisabled}>Submit</button>
        <button onClick={this.reset}>Reset</button>
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
