import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ChoresList extends Component {
  getChoresToMap = () => {
    const { usersHouse, placeRendered } = this.props;
    let choresToMap;
    if (placeRendered === '/houselist') {
      choresToMap = usersHouse.chores;
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
          const assignedTo = usersHouse.users.find(user => user.id === chore.assignedTo).name;
          return (<div key={chore.datePosted}>
            {/* <Link to={`chores/${chore.id}`}>{chore.title}</Link> */}
            <p>{chore.title}</p>
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
