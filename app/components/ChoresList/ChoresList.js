import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ChoresList extends Component {
  getChoresToMap = () => {
    const { usersHouse, placeRendered, currentUser } = this.props;
    const userChores = usersHouse.chores.filter(chore => chore.assignedTo === currentUser.id);
    const userChoresToDo = userChores.filter(chore => chore.done === false);
    const userChoresDone = userChores.filter(chore => chore.done === true);
    const allChoresToDo = usersHouse.chores.filter(chore => chore.done === false);
    let choresToMap;
    if (placeRendered === '/houselist') {
      choresToMap = usersHouse.chores;
    } else if (placeRendered === '/userlist') {
      choresToMap = [...userChoresToDo, ...userChoresDone];
    } else if (placeRendered === '/') {
      choresToMap = userChoresToDo;
    } else if (placeRendered === 'summary') {
      choresToMap = allChoresToDo;
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
            <h4>{placeRendered === '/houselist' ? 'Claimed by' : null}</h4>
            <h4>{placeRendered === '/houselist' ? 'Done' : null}</h4>
            <h4>{placeRendered === '/userlist' ? 'Done' : null}</h4>
            {choresToMap.map(chore => {
              const assignedTo = chore.assignedTo.length ? usersHouse.users.find(user => user.id === chore.assignedTo).name : 'claim';
              return (<div key={chore.datePosted}>
                <Link to={`chores/${chore.id}`}>{chore.title}</Link>
                <p>{`Urgency: ${chore.urgency}`}</p>
                <p onClick={() => this.claimChore(currentUser.id, chore, usersHouse)}>{placeRendered === '/houselist' ? assignedTo : null}</p>
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
  claimChore: PropTypes.func
};
