import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BillsList from '../BillsList/BillsList.js';
import BulletinsList from '../BulletinsList/BulletinsList.js';
import ChoresList from '../ChoresList/ChoresList.js';

class Summary extends Component {
  render() {
    const {
      usersHouse,
      currentUser,
      placeRendered,
      markChoreDone,
      claimChore,
      addReaderToBulletin,
      markBillPaid
    } = this.props;
    return (
      <div>
        <BulletinsList usersHouse={usersHouse}
          currentUser={currentUser}
          addReaderToBulletin={addReaderToBulletin}
          placeRendered={placeRendered}/>
        <BillsList usersHouse={usersHouse}
          currentUser={currentUser}
          markBillPaid={markBillPaid}
          placeRendered={placeRendered}/>
        <ChoresList usersHouse={usersHouse}
          currentUser={currentUser}
          placeRendered={placeRendered}
          markChoreDone={markChoreDone}
          claimChore={claimChore}/>
      </div>
    );
  }
}

export default Summary;

Summary.propTypes = {
  usersHouse: PropTypes.object,
  currentUser: PropTypes.object,
  placeRendered: PropTypes.string,
  markChoreDone: PropTypes.func,
  claimChore: PropTypes.func,
  addReaderToBulletin: PropTypes.func,
  markBillPaid: PropTypes.func
};
