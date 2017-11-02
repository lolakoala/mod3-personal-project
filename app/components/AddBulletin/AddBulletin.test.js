import React from "react";
import AddBulletin from './AddBulletin.js';
import { shallow } from "enzyme";
import currentUser1 from '../../mockData/currentUser1.js';
import usersHouse from '../../mockData/usersHouse.js';

describe('AddBulletin component', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<AddBulletin usersHouse={usersHouse}
    currentUser={currentUser1}
    addBulletin={mockFn}
    getTodaysDate={mockFn}
    updateItem={mockFn}/>);
  const input1 = wrapper.find('input');
  const input2 = wrapper.find('textarea');

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a default state', () => {
    const defaultState = {
      title: '',
      details: '',
      submitDisabled: true
    };

    expect(wrapper.state()).toEqual(defaultState);
  });

  it('should render 2 inputs and 2 buttons', () => {
    const buttons = wrapper.find('button');

    expect(input1.length + input2.length).toEqual(2);
    expect(buttons.length).toEqual(2);
  });

  it('should change state on input', () => {
    const newState = {
      title: 'Gas Bill Due',
      details: 'Pay Gas Bill Today',
      submitDisabled: false
    };

    input1.simulate('change', { target: { value: 'Gas Bill Due' } });
    input2.simulate('change', { target: { value: 'Pay Gas Bill Today' } });
    expect(wrapper.state()).toEqual(newState);
  });

  it('should fire actions', () => {
    const submit = wrapper.find('button').first();

    submit.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
