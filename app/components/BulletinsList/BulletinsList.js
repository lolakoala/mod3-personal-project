import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BulletinsList extends Component {
  getINeedToRead = (bulletins, id) => {
    return bulletins.filter(bulletin => {
      return !bulletin.hasRead.includes(id);
    }).sort((itemA, itemB) => Date.parse(itemA.datePosted) - Date.parse(itemB.datePosted));
  }

  getWeekBulletins = bulletins => {
    return bulletins.filter(bulletin => Date.now() - bulletin.id <= 604800000)
      .sort((itemA, itemB) => Date.parse(itemA.datePosted) - Date.parse(itemB.datePosted));
  }

  getMatchingBulletins = (bulletins, value) => {
    return bulletins.filter(bulletin => {
      return bulletin.title.includes(value) || bulletin.details.includes(value);
    }).sort((itemA, itemB) => Date.parse(itemB.datePosted) - Date.parse(itemA.datePosted));
  }

  getBulletins = () => {
    const { usersHouse, currentUser, placeRendered, searchValue } = this.props;
    if (placeRendered === '/') {
      return this.getINeedToRead(usersHouse.bulletins, currentUser.id);
    } else if (placeRendered === '/houselist') {
      return usersHouse.bulletins.sort((itemA, itemB) => Date.parse(itemB.datePosted) - Date.parse(itemA.datePosted));
    } else if (placeRendered === 'summary') {
      return this.getWeekBulletins(usersHouse.bulletins);
    } else if (placeRendered === 'search') {
      return this.getMatchingBulletins(usersHouse.bulletins, searchValue);
    }
  }

  getError = () => {
    const { placeRendered, usersHouse } = this.props;
    if (placeRendered === '/') {
      return 'You have no unread bulletins.';
    } else if (placeRendered === '/houselist') {
      return `${usersHouse.houseName} has no bulletins posted.`;
    } else if (placeRendered === 'summary') {
      return `${usersHouse.houseName} has no bulletins posted this week.`;
    } else if (placeRendered === 'search') {
      return 'No bulletins match your query.';
    }
  }

  render() {
    const { usersHouse, currentUser, addReaderToBulletin, placeRendered } = this.props;
    if (usersHouse.bulletins.length && usersHouse.bulletins[0].title !== 'fake') {
      const bulletins = this.getBulletins();
      if (bulletins.length) {
        return (
          <div className='bulletinslist'>
            {placeRendered === 'summary' ? <h4>Current Bulletins</h4> : null}
            {placeRendered === '/' ? <h4>Bulletins I Need to Read</h4> : null}
            {bulletins.map(bulletin => {
              let bulletinClass;
              bulletin.hasRead.includes(currentUser.id) ? bulletinClass = 'read' : bulletinClass = 'not-read';
              return (<div key={bulletin.id} className={`${bulletinClass} bulletin`}>
                <Link
                  className='bulletin-title'
                  to={`bulletins/${bulletin.id}`}
                  onClick={() => addReaderToBulletin(bulletin.id, currentUser.id, usersHouse)}>
                  {bulletin.title}
                </Link>
                <p>{`Posted on: ${bulletin.datePosted}`}</p>
              </div>);
            })}
          </div>
        );
      } else {
        return <p className='error'>{this.getError()}</p>;
      }
    } else {
      return <p className='error'>{`${usersHouse.houseName} has no bulletins posted.`}</p>;
    }

  }
}

export default BulletinsList;

BulletinsList.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  addReaderToBulletin: PropTypes.func,
  placeRendered: PropTypes.string,
  searchValue: PropTypes.string
};
