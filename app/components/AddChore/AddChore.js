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
      done: false
    };
  }

  handleChange(event, type) {
    const { value } = event.target;
    this.setState({
      [type]: value
    });
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
        <input type="radio" id="high-urgency"
          name="urgency" value="high" onChange={event => this.handleChange(event, 'urgency')}/>
        <label htmlFor="high-urgency">High</label>
        <input type="radio" id="medium-urgency"
          name="urgency" value="medium" onChange={event => this.handleChange(event, 'urgency')}/>
        <label htmlFor="medium-urgency">Medium</label>
        <input type="radio" id="low-urgency"
          name="urgency" value="low" onChange={event => this.handleChange(event, 'urgency')}/>
        <label htmlFor="low-urgency">Low</label>
      </div>
    );
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <input type='text' placeholder='Title' onChange={event => this.handleChange(event, 'title')}/>
        <textarea type='text' placeholder='Details' onChange={event => this.handleChange(event, 'details')}/>
        <input type='checkbox' id='selfassign' onChange={() => this.assignToSelf(currentUser.id)}/>
        <label htmlFor='selfassign'>Assign to Self</label>
        <input type='checkbox' id='alreadyDone' onChange={() => this.toggleDone()}/>
        <label htmlFor='alreadyDone'>Already Done</label>
        {this.state.done === false ? this.renderUrgency() : null}
        <button onClick={() => this.addChore()}>Submit</button>
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
