import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bulletin extends Component {
  render() {
    const { usersHouse } = this.props;
    const paramsId = this.props.match.params.id;
    const bulletin = usersHouse.bulletins.find(bulletin => {
      return (parseInt(bulletin.id, 10) === parseInt(paramsId, 10));
    });
    const needsToRead = usersHouse.users.filter(user => {
      return !bulletin.hasRead.includes(user.id);
    });
    return (
      <div>
        <p>{bulletin.title}</p>
        <p>{bulletin.details}</p>
        <p>{`Posted by ${bulletin.postedBy.name} on ${bulletin.datePosted}`}</p>
        <p>Needs to be read by ...</p>
        {needsToRead.map(user => {
          return <p key={user.id}>{user.name}</p>;
        })}
      </div>
    );
  }
}

export default Bulletin;

Bulletin.propTypes = {
  usersHouse: PropTypes.object,
  match: PropTypes.object
};
