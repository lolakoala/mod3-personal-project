import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ChoresList extends Component {
  getChoresToMap = () => {
    const { usersHouse, placeRendered, currentUser } = this.props;
    const userChores = usersHouse.chores.filter(chore => chore.assignedTo === currentUser.id);
    const userChoresToDo = userChores.filter(chore => chore.done === false);
    const userChoresDone = userChores.filter(chore => chore.done === true);
    let choresToMap;
    if (placeRendered === '/houselist') {
      choresToMap = usersHouse.chores;
    } else if (placeRendered === '/userlist') {
      choresToMap = [...userChoresToDo, ...userChoresDone];
    }
    return choresToMap;
  }

  getTitle = () => {
    const { placeRendered } = this.props;
    let title;
    if (placeRendered === '/') {
      title = 'Chores I Need To Do';
    } else if (placeRendered === '/userlist') {
      title = 'My Chores';
    } else if (placeRendered === '/houselist') {
      title = 'House Chores';
    }
    return title;
  }

  render() {
    const { placeRendered, usersHouse } = this.props;
    const choresToMap = this.getChoresToMap();
    return (
      <div>
        <h2>{this.getTitle()}</h2>
        <h4>Title</h4>
        <h4>Urgency</h4>
        <h4>{placeRendered === '/houselist' ? 'Assignee' : null}</h4>
        <h4>Done</h4>
        {choresToMap.map(chore => {
          const assignedTo = usersHouse.users.find(user => user.id === chore.assignedTo).name || 'none';
          return (<div key={chore.datePosted}>
            <Link to={`chores/${chore.id}`}>{chore.title}</Link>
            <p>{`Urgency: ${chore.urgency}`}</p>
            <p>{placeRendered === '/houselist' ? assignedTo : null}</p>
          </div>);
        })}
      </div>
    );
  }
}

export default ChoresList;

ChoresList.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  placeRendered: PropTypes.string
};
