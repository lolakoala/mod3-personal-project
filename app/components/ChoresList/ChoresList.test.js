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
    searchValue={''}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a title', () => {
    const title = wrapper.find('.choreslist-title');

    expect(title.text()).toEqual('House Chores');
  });

  it('should have a title column header', () => {
    const titleHeader = wrapper.find('.title-header');

    expect(titleHeader.text()).toEqual('Title');
  });

  it('should have an urgency column header', () => {
    const urgencyHeader = wrapper.find('.urgency-header');

    expect(urgencyHeader.text()).toEqual('Urgency');
  });

  it('should have a claimed header', () => {
    const claimedHeader = wrapper.find('.claimed-header');

    expect(claimedHeader.text()).toEqual('Claimed by');
  });

  it('should have a done header', () => {
    const doneHeader = wrapper.find('.done-header');

    expect(doneHeader.text()).toEqual('Done');
  });

  it('should have display all chores of the house', () => {
    const chores = wrapper.find('.chore');

    expect(chores.length).toEqual(usersHouse.chores.length);
  });

  it('should fire action', () => {
    const claimButton = wrapper.find('.claim-button').first();
    const doneButton = wrapper.find('.done-button').first();

    claimButton.simulate('click');
    doneButton.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
