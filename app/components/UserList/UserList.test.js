import React from "react";
import UserList from './UserList.js';
import { shallow } from "enzyme";
import usersHouse from '../../mockData/usersHouse.js';
import currentUser1 from '../../mockData/currentUser1.js';

describe('UserList component', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<UserList usersHouse={usersHouse}
    currentUser={currentUser1}
    markBillPaid={mockFn}
    markChoreDone={mockFn}
    match={{ url: '/userlist' }}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have default state', () => {
    expect(wrapper.state().currentView).toEqual('');
  });

  it('should have a title', () => {
    const title = wrapper.find('h2');

    expect(title.text()).toEqual('My Lists');
  });

  it('should have two buttons', () => {
    const buttons = wrapper.find('button');

    expect(buttons.length).toEqual(2);
  });

  it('should change state and content when clicking view bills', () => {
    const button = wrapper.find('button').first();

    button.simulate('click');
    expect(wrapper.state().currentView).toEqual('bills');
    expect(wrapper.find('BillsList').length).toEqual(1);
  });

  it('should change state and content when clicking view chores', () => {
    const button = wrapper.find('button').last();

    button.simulate('click');
    expect(wrapper.state().currentView).toEqual('chores');
    expect(wrapper.find('ChoresList').length).toEqual(1);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
