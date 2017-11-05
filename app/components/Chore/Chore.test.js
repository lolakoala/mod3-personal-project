import React from "react";
import Chore from './Chore.js';
import { shallow } from "enzyme";
import usersHouse from '../../mockData/usersHouse.js';
import currentUser1 from '../../mockData/currentUser1.js';

describe('chore component', () => {
  const mockFn = jest.fn();
  const chore = usersHouse.chores[0];
  const match = {
    params: {
      id: "c1509485241076"
    }
  };
  const wrapper = shallow(<Chore
    usersHouse={usersHouse}
    currentUser={currentUser1}
    claimChore={mockFn}
    markChoreDone={mockFn}
    match={match}/>);
  const claimedInfo = wrapper.find('.claim-chore');

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a title', () => {
    const title = wrapper.find('.title');

    expect(title.text()).toEqual(`Chore: ${chore.title}`);
  });

  it('should have an urgency', () => {
    const urgency = wrapper.find('.urgency');

    expect(urgency.text()).toEqual(`not urgent`);
  });

  it('should have posted info', () => {
    const postedInfo = wrapper.find('.posted-by-on');

    expect(postedInfo.text()).toEqual(`Posted by ${chore.postedBy.name} on ${chore.datePosted}`);
  });

  it('should have claimed info', () => {

    expect(chore.assignedTo).toEqual(currentUser1.id);
    expect(claimedInfo.text()).toEqual(`Claimed by ${currentUser1.name}`);
  });

  it('should have details', () => {
    const details = wrapper.find('.details');

    expect(details.text()).toEqual(`Details: ${chore.details}`);
  });

  it('should fire actions', () => {
    const doneButton = wrapper.find('.chore-done');

    doneButton.simulate('click');
    claimedInfo.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
