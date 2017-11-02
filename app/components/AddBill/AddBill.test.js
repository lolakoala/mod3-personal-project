import React from "react";
import AddBill from './AddBill.js';
import { shallow } from "enzyme";
import currentUser1 from '../../mockData/currentUser1.js';
import usersHouse from '../../mockData/usersHouse.js';

describe('AddBill component', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<AddBill usersHouse={usersHouse}
    currentUser={currentUser1}
    addBill={mockFn}
    getTodaysDate={mockFn}
    updateItem={mockFn}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a default state', () => {
    const defaultState = {
      item: '',
      split: '',
      equalSelect: [],
      title: '',
      duedate: '',
      total: '',
      allUsersTotals: [],
      details: '',
      buttonDisabled: true,
      error: '',
      percentageLeft: 100,
      dollarLeft: ''
    };

    expect(wrapper.state()).toEqual(defaultState);
  });

  it('should have 6 buttons', () => {
    const buttons = wrapper.find('button');

    expect(buttons.length).toEqual(6);
  });

  it('should start with 3 inputs', () => {
    const inputs = wrapper.find('input');

    expect(inputs.length).toEqual(3);
  });

  it('should change state', () => {
    const titleInput = wrapper.find('.title-input');
    const duedateInput = wrapper.find('.duedate-input');
    const totalInput = wrapper.find('.total-input');
    const detailsInput = wrapper.find('textarea');

    titleInput.simulate('change', { target: { value: 'Gas Bill' } });
    duedateInput.simulate('change', { target: { value: '11/9/17' } });
    totalInput.simulate('change', { target: { value: '150' } });
    detailsInput.simulate('change', { target: { value: 'We turned on the heat this month.' } });
    expect(wrapper.state().title).toEqual('Gas Bill');
    expect(wrapper.state().duedate).toEqual('11/9/17');
    expect(wrapper.state().total).toEqual('150');
    expect(wrapper.state().details).toEqual('We turned on the heat this month.');
  });

  it('should calculate an equal split', () => {
    const equalAllButton = wrapper.find('.equal-all-button');
    const { users } = usersHouse;
    const userTotal = wrapper.state().total / users.length;
    const newState = users.map(user => ({
      id: user.id,
      total: userTotal,
      paid: false
    }));

    equalAllButton.simulate('click');
    expect(wrapper.state().split).toEqual('equalAll');
    expect(wrapper.state().allUsersTotals).toEqual(newState);
    expect(wrapper.state().buttonDisabled).toEqual(false);
  });

  it('should calculate a custom equal split', () => {
    const equalSelectButton = wrapper.find('.equal-select-button');

    equalSelectButton.simulate('click');
    const inputs = wrapper.find('input');

    expect(inputs.length).toEqual(3 + usersHouse.users.length);
    expect(wrapper.state().split).toEqual('equal');
  });

  it('should calculate custom split by percentage', () => {
    const customPercentageButton = wrapper.find('.custom-percentage-button');

    customPercentageButton.simulate('click');
    const inputs = wrapper.find('input');

    expect(inputs.length).toEqual(3 + usersHouse.users.length);
    expect(wrapper.state().split).toEqual('customP');
  });

  it('should calculate custom split by dollar', () => {
    const customDollarButton = wrapper.find('.custom-dollar-button');

    customDollarButton.simulate('click');
    const inputs = wrapper.find('input');


    expect(inputs.length).toEqual(3 + usersHouse.users.length);
    expect(wrapper.state().split).toEqual('customD');
  });

  it('should fire functions', () => {
    const equalAllButton = wrapper.find('.equal-all-button');
    const billSubmitButton = wrapper.find('.bill-submit');

    equalAllButton.simulate('click');
    billSubmitButton.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
