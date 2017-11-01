import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Chore extends Component {
  render() {
    const { usersHouse } = this.props;
    const chore = usersHouse.chores.find(chore => chore.id === this.props.match.params.id);
    const userAssigned = usersHouse.users.find(user => user.id === chore.assignedTo).name || 'none';
    return (
      <div>
        <p>{`Chore: ${chore.title}`}</p>
        <p>{`Urgency: ${chore.urgency}`}</p>
        <p>{`Posted by ${chore.postedBy.name} on ${chore.datePosted}`}</p>
        <p>{`Claimed by ${userAssigned}`}</p>
        <p>{`Details: ${chore.details}`}</p>
      </div>
    );
  }

}

export default Chore;

Chore.propTypes = {
  usersHouse: PropTypes.object,
  match: PropTypes.object
};
