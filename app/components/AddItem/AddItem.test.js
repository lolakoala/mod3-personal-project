import React from "react";
import AddItem from './AddItem.js';
import { shallow } from "enzyme";
import currentUser1 from '../../mockData/currentUser1.js';
import usersHouse from '../../mockData/usersHouse.js';

describe('AddItem component', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<AddItem usersHouse={usersHouse}
    currentUser={currentUser1}
    addChore={mockFn}
    addBill={mockFn}
    addBulletin={mockFn}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a default state', () => {
    const defaultState = {
      item: ''
    };

    expect(wrapper.state()).toEqual(defaultState);
  });

  it('should have 3 buttons', () => {
    const buttons = wrapper.find('button');

    expect(buttons.length).toEqual(3);
  });

  it('should change state and show component when add bill button clicked', () => {
    const addBill = wrapper.find('.add-bill');

    addBill.simulate('click');
    expect(wrapper.state().item).toEqual('bill');
    expect(wrapper.find('AddBill').length).toEqual(1);
  });

  it('should change state and show component when add chore button clicked', () => {
    const addChore = wrapper.find('.add-chore');

    addChore.simulate('click');
    expect(wrapper.state().item).toEqual('chore');
    expect(wrapper.find('Chore').length).toEqual(1);
  });

  it('should change state and show component when add bulletin button clicked', () => {
    const addBulletin = wrapper.find('.add-bulletin');

    addBulletin.simulate('click');
    expect(wrapper.state().item).toEqual('bulletin');
    expect(wrapper.find('AddBulletin').length).toEqual(1);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
