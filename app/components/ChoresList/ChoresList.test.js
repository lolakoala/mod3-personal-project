import React from "react";
import ChoresList from './ChoresList.js';
import { shallow } from "enzyme";
import usersHouse from '../../mockData/usersHouse.js';
import currentUser1 from '../../mockData/currentUser1.js';

describe('ChoresList component', () => {
  const mockFn=jest.fn();
  const wrapper = shallow(<ChoresList usersHouse={usersHouse}
    currentUser={currentUser1}
    placeRendered={'/houselist'}
    markChoreDone={mockFn}
    claimChore={mockFn}
    searchValue={''}
    joinHouseDisabled={true}
    createHouseDisabled={true}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have display all chores of the house', () => {
    const chores = wrapper.find('.chore');

    expect(chores.length).toEqual(usersHouse.chores.length);
  });

  it('should fire action', () => {
    const claimButton = wrapper.find('.claim-button').first();
    const doneButton = wrapper.find('.choredone-false').first();

    claimButton.simulate('click');
    doneButton.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
