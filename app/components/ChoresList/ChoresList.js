import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ChoresList extends Component {
  getChoresToMap = () => {
    const { usersHouse, placeRendered, currentUser, searchValue } = this.props;
    const userChores = usersHouse.chores.filter(chore => chore.assignedTo === currentUser.id);
    const userChoresToDo = userChores.filter(chore => chore.done === false);
    const userChoresDone = userChores.filter(chore => chore.done === true);
    const allChoresToDo = usersHouse.chores.filter(chore => chore.done === false);
    const matchingChores = usersHouse.chores.filter(chore => {
      return chore.title.includes(searchValue) || chore.details.includes(searchValue);
    });
    let choresToMap;
    if (placeRendered === '/houselist') {
      choresToMap = usersHouse.chores;
    } else if (placeRendered === '/userlist') {
      choresToMap = [...userChoresToDo, ...userChoresDone];
    } else if (placeRendered === '/') {
      choresToMap = userChoresToDo;
    } else if (placeRendered === 'summary') {
      choresToMap = allChoresToDo;
    } else if (placeRendered === 'search') {
      choresToMap = matchingChores;
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
    } else if (placeRendered === 'summary') {
      title = 'Chores to Be Done';
    } else if (placeRendered === 'search') {
      title = 'Matching Chores';
    }
    return title;
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
          <div>
            <h2>{this.getTitle()}</h2>
            <h4>Title</h4>
            <h4>Urgency</h4>
            <h4>{placeRendered !== '/userlist' && placeRendered === '/' ? 'Claimed by' : null}</h4>
            <h4>{placeRendered !== '/' ? null : 'Done'}</h4>
            {choresToMap.map(chore => {
              const assignedTo = chore.assignedTo.length ? usersHouse.users.find(user => user.id === chore.assignedTo).name : 'claim';
              return (<div key={chore.datePosted}>
                <Link to={`chores/${chore.id}`}>{chore.title}</Link>
                <p>{`Urgency: ${chore.urgency}`}</p>
                <p onClick={() => this.claimChore(currentUser.id, chore, usersHouse)}>{placeRendered !== '/userlist' && placeRendered === '/' ? assignedTo : null}</p>
                <div onClick={() => this.markChoreDone(chore, usersHouse)}>{chore.done === false ? 'Mark as Done' : null}</div>
              </div>);
            })}
          </div>
        );
      } else {
        return <div></div>;
      }
    } else {
      return <div></div>;
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
