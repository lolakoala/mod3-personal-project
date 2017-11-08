import React from 'react';
import PropTypes from 'prop-types';

const JoinHouse = ({ handleChange, getHouse, createHouse, joinHouseDisabled, createHouseDisabled }) => {
  return (
    <div className='join-house'>
      <input type='text'
        placeholder="House Code"
        onChange={ (event) => handleChange(event, 'houseCode' ) }/>
      <button
        disabled={!joinHouseDisabled}
        onClick={getHouse}>
          Join a House
      </button>
      <input type="text"
        placeholder="House Name"
        onChange={ (event) => handleChange(event, 'houseName' ) }/>
      <input type="text"
        placeholder="House Code"
        onChange={ (event) => handleChange(event, 'houseCode' ) }/>
      <button
        disabled={!createHouseDisabled}
        onClick={createHouse}>
          Add My House
      </button>
    </div>
  );
};

export default JoinHouse;

JoinHouse.propTypes = {
  handleChange: PropTypes.func,
  getHouse: PropTypes.func,
  createHouse: PropTypes.func,
  joinHouseDisabled: PropTypes.string,
  createHouseDisabled: PropTypes.string
};
