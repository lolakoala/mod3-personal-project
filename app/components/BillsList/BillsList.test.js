import React from "react";
import BillsList from './BillsList.js';
import { shallow } from "enzyme";
import usersHouse from '../../mockData/usersHouse.js';
import currentUser1 from '../../mockData/currentUser1.js';


describe('BillsList component', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<BillsList usersHouse={usersHouse}
    currentUser={currentUser1}
    markBillPaid={mockFn}
    placeRendered={'/houselist'}
    searchValue={''}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have display all bills of the house', () => {
    const bills = wrapper.find('.bill');

    expect(bills.length).toEqual(usersHouse.bills.length);
  });

  it('should fire action', () => {
    const markPaid = wrapper.find('.mark-paid').first();

    markPaid.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
