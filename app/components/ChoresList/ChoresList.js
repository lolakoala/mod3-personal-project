import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ChoresList extends Component {
  getUserChores = (chores, id, which) => {
    const userChores = chores.filter(chore => chore.assignedTo === id);
    const userChoresToDo = userChores.filter(chore => chore.done === false)
      .sort((itemA, itemB) => Date.parse(itemA.datePosted) - Date.parse(itemB.datePosted));
    const userChoresDone = userChores.filter(chore => chore.done === true)
      .sort((itemA, itemB) => Date.parse(itemA.datePosted) - Date.parse(itemB.datePosted));
    return which === 'all' ? [...userChoresToDo, ...userChoresDone] : userChoresToDo;
  }

  getMatchingChores = (chores, value) => {
    return chores.filter(chore => {
      return chore.title.includes(value) || chore.details.includes(value);
    }).sort((itemA, itemB) => Date.parse(itemB.datePosted) - Date.parse(itemA.datePosted));
  }

  getChoresToMap = () => {
    const { usersHouse, placeRendered, currentUser, searchValue } = this.props;
    if (placeRendered === '/houselist') {
      return usersHouse.chores.sort((itemA, itemB) => Date.parse(itemB.datePosted) - Date.parse(itemA.datePosted));
    } else if (placeRendered === '/userlist') {
      return this.getUserChores(usersHouse.chores, currentUser.id, 'all');
    } else if (placeRendered === '/') {
      return this.getUserChores(usersHouse.chores, currentUser.id, 'todo');
    } else if (placeRendered === 'summary') {
      return usersHouse.chores.filter(chore => chore.done === false).sort((itemA, itemB) => Date.parse(itemB.datePosted) - Date.parse(itemA.datePosted));
    } else if (placeRendered === 'search') {
      return this.getMatchingChores(usersHouse.chores, searchValue);
    }
  }

  getError = () => {
    const { placeRendered, usersHouse } = this.props;
    if (placeRendered === '/') {
      return 'You have chores to do.';
    } else if (placeRendered === '/houselist') {
      return `${usersHouse.houseName} has no chores posted.`;
    } else if (placeRendered === 'summary') {
      return `${usersHouse.houseName} has no chores to do.`;
    } else if (placeRendered === 'search') {
      return 'No chores match your query.';
    }
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
    const { placeRendered, usersHouse, currentUser } = this.props;
    if (usersHouse.chores.length && usersHouse.chores[0].title !== 'fake') {
      const choresToMap = this.getChoresToMap();
      if (choresToMap.length) {
        return (
          <div className='choreslist'>
            {placeRendered === '/' ? <h4>Chores I Need To Do</h4> : null}
            {placeRendered === 'summary' ? <h4>Chores To Be Done</h4> : null}
            {choresToMap.map(chore => {
              return (<div key={chore.datePosted} className='chore'>
                <Link to={`chores/${chore.id}`}>{chore.title}</Link>
                <p>{chore.urgency === 'high' ? 'urgent' : 'not urgent'}</p>
                <p className='claim-button' onClick={() => this.claimChore(currentUser.id, chore, usersHouse)}>
                  {chore.assignedTo.length ? 'Claimed' : 'Claim Chore'}
                </p>
                <p className='choredone' onClick={() => this.markChoreDone(chore, usersHouse)}>{chore.done === false ? 'Mark Done' : 'Done'}</p>
              </div>);
            })}
          </div>
        );
      } else {
        return <p className='error'>{this.getError()}</p>;
      }
    } else {
      return <p className='error'>{`${usersHouse.houseName} has no chores posted.`}</p>;
    }
  }
}

export default ChoresList;

ChoresList.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  placeRendered: PropTypes.string,
  markChoreDone: PropTypes.func,
  claimChore: PropTypes.func,
  searchValue: PropTypes.string
};
