import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BulletinsList extends Component {
  getBulletins = () => {
    const { usersHouse, currentUser, placeRendered, searchValue } = this.props;
    const iNeedToRead = usersHouse.bulletins.filter(bulletin => {
      return !bulletin.hasRead.includes(currentUser.id);
    });
    const matchingBulletins = usersHouse.bulletins.filter(bulletin => {
      return bulletin.title.includes(searchValue) || bulletin.details.includes(searchValue);
    });
    if (placeRendered === '/') {
      return iNeedToRead;
    } else if (placeRendered === '/houselist') {
      return usersHouse.bulletins;
    } else if (placeRendered === 'summary') {
      const today = Date.now();
      const weekBulletins = usersHouse.bulletins.filter(bulletin => today - bulletin.id <= 604800000);
      return weekBulletins;
    } else if (placeRendered === 'search') {
      return matchingBulletins;
    }
  }

  getHeaders = () => {
    const { placeRendered } = this.props;
    const allBulletinHeaders = <div>
      {placeRendered === 'search' ? <h4>Matching Bulletins</h4> : null}
      <h4>Title</h4>
      <h4>Date Posted</h4>
      <h4>All Read</h4>
    </div>;
    const unreadBulletinHeaders = <div>
      <h2>Bulletins I Need to Read</h2>
      <h4>Title</h4>
      <h4>Date Posted</h4>
    </div>;
    if (placeRendered === '/') {
      return unreadBulletinHeaders;
    } else {
      return allBulletinHeaders;
    }
  }

  render() {
    const { usersHouse, currentUser, addReaderToBulletin } = this.props;
    if (usersHouse.bulletins.length && usersHouse.bulletins[0].title !== 'fake') {
      const bulletins = this.getBulletins();
      if (bulletins.length) {
        return (
          <div>
            {this.getHeaders()}
            {bulletins.map(bulletin => {
              let bulletinClass;
              bulletin.hasRead.includes(currentUser.id) ? bulletinClass = 'read' : bulletinClass = 'not-read';
              return (<div key={bulletin.id} className={bulletinClass}>
                <Link
                  to={`bulletins/${bulletin.id}`}
                  onClick={() => addReaderToBulletin(bulletin.id, currentUser.id, usersHouse)}>
                  {bulletin.title}
                </Link>
                <p>{bulletin.datePosted}</p>
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

export default BulletinsList;

BulletinsList.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  addReaderToBulletin: PropTypes.func,
  placeRendered: PropTypes.string,
  searchValue: PropTypes.string
};
