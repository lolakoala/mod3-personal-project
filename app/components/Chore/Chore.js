import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Chore extends Component {
  getUserAssigned = () => {
    const { usersHouse } = this.props;
    const chore = usersHouse.chores.find(chore => chore.id === this.props.match.params.id);
    return usersHouse.users.find(user => user.id === chore.assignedTo).name;
  }

  claimChore = (userId, chore, usersHouse) => {
    this.props.claimChore(userId, chore, usersHouse);
    this.forceUpdate();
  }

  markChoreDone = (chore, usersHouse) => {
    this.props.markChoreDone(chore, usersHouse);
    this.forceUpdate();
  }

  render() {
    const { usersHouse, currentUser } = this.props;
    const chore = usersHouse.chores.find(chore => chore.id === this.props.match.params.id);
    return (
      <div>
        <p className='title'>{`Chore: ${chore.title}`}</p>
        <p className='urgency'>{`Urgency: ${chore.urgency}`}</p>
        <p className='posted-by-on'>{`Posted by ${chore.postedBy.name} on ${chore.datePosted}`}</p>
        <p className='claim-chore'
          onClick={() => this.claimChore(currentUser.id, chore, usersHouse)}>
          {chore.assignedTo.length ? `Claimed by ${this.getUserAssigned()}` : 'Claim Chore'}
        </p>
        <p className='details'>{`Details: ${chore.details}`}</p>
        <p className='chore-done' onClick={() => this.markChoreDone(chore, usersHouse)}>{chore.done === false ? 'Mark as Done' : 'Done'}</p>
      </div>
    );
  }

}

export default Chore;

Chore.propTypes = {
  usersHouse: PropTypes.object,
  match: PropTypes.object,
  markChoreDone: PropTypes.func,
  currentUser: PropTypes.object,
  claimChore: PropTypes.func
};
