import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BulletinsList = ({ usersHouse, currentUser, addReaderToBulletin }) => {
  const iNeedToRead = usersHouse.bulletins.filter(bulletin => {
    return !bulletin.hasRead.includes(currentUser.id);
  });
  if (iNeedToRead.length) {
    return (
      <div>
        <h2>Bulletins I Need to Read</h2>
        <h4>Title</h4>
        <h4>Date Posted</h4>
        {iNeedToRead.map(bulletin => {
          return (<div key={bulletin.id}>
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
};

export default BulletinsList;

BulletinsList.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  addReaderToBulletin: PropTypes.func
};
