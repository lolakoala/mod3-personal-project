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

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a title', () => {
    const title = wrapper.find('.title');

    expect(title.text()).toEqual(`Chore: ${chore.title}`);
  });
});
