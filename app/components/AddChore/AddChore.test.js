import React from "react";
import AddChore from './AddChore.js';
import { shallow } from "enzyme";
import currentUser1 from '../../mockData/currentUser1.js';
import usersHouse from '../../mockData/usersHouse.js';

describe('AddChore component', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<AddChore usersHouse={usersHouse}
    currentUser={currentUser1}
    addChore={mockFn}
    getTodaysDate={mockFn}
    updateItem={mockFn}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a default state', () => {
    const defaultState = {
      title: '',
      details: '',
      assignedTo: '',
      urgency: '',
      done: false,
      submitDisabled: true
    };

    expect(wrapper.state()).toEqual(defaultState);
  });

  it('should have 5 inputs and 2 buttons', () => {
    const inputs = wrapper.find('input');
    const input1 = wrapper.find('textarea');
    const buttons = wrapper.find('button');

    expect(inputs.length + input1.length).toEqual(5);
    expect(buttons.length).toEqual(2);
  });

  it('should change state on input', () => {
    const titleInput = wrapper.find('input').first();
    const highUrgency = wrapper.find('.high-urgency');
    const newState = {
      title: 'Rake Leaves',
      details: '',
      assignedTo: '',
      urgency: 'high',
      done: false,
      submitDisabled: false
    };

    highUrgency.simulate('change', { target: { value: 'high' } });
    titleInput.simulate('change', { target: { value: 'Rake Leaves' } });
    expect(wrapper.state()).toEqual(newState);
  });

  it('should fire functions', () => {
    const submit = wrapper.find('button').first();

    submit.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
