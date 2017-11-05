import React from "react";
import HeaderNav from './HeaderNav.js';
import { shallow } from "enzyme";
import usersHouse from '../../mockData/usersHouse.js';
import currentUser1 from '../../mockData/currentUser1.js';

describe('HeaderNav', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<HeaderNav
    currentUser={currentUser1}
    usersHouse={usersHouse}
    signOut={mockFn}
    leaveHouse={mockFn}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should match snap', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a title and subtitle', () => {
    const title = wrapper.find('h1');
    const subtitle = wrapper.find('h3');

    expect(title.length).toEqual(1);
    expect(subtitle.length).toEqual(1);
  });

  it('should have five links', () => {
    const link = wrapper.find('Link');

    expect(link.length).toEqual(5);
  });

  it('should have signout and leavehouse div', () => {
    const signoutDiv = wrapper.find('.signout');
    const leavehouseDiv = wrapper.find('.leave-house');

    expect(signoutDiv.length).toEqual(1);
    expect(leavehouseDiv.length).toEqual(1);
  });

  it('should render userStuff', () => {
    const userStuff = wrapper.find('.user-stuff');
    const greeting = wrapper.find('.greeting');

    expect(userStuff.length).toEqual(1);
    expect(greeting.text()).toEqual(`Welcome to ${usersHouse.houseName},  ${currentUser1.name}.`);
  });

  it('should not render userStuff when no user', () => {
    const altWrapper = shallow(<HeaderNav
      currentUser={{}}
      usersHouse={{}}
      signOut={mockFn}
      leaveHouse={mockFn}/>);
    const userStuff = altWrapper.find('.user-stuff');

    expect(userStuff.length).toEqual(0);
  });

  it('should fire actions', () => {
    const signoutDiv = wrapper.find('.signout');
    const leavehouseDiv = wrapper.find('.leave-house');

    signoutDiv.simulate('click');
    leavehouseDiv.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
