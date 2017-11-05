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

  it('should have a title', () => {
    const title = wrapper.find('.billslist-title');

    expect(title.text()).toEqual('House Bills');
  });

  it('should have a title column header', () => {
    const titleHeader = wrapper.find('.title-header');

    expect(titleHeader.text()).toEqual('Title');
  });

  it('should have a duedate column header', () => {
    const duedateHeader = wrapper.find('.duedate-header');

    expect(duedateHeader.text()).toEqual('Due Date');
  });

  it('should have a total header', () => {
    const totalHeader = wrapper.find('.total-header');

    expect(totalHeader.text()).toEqual('Total');
  });

  it('should have a paid header', () => {
    const paidHeader = wrapper.find('.paid-header');

    expect(paidHeader.text()).toEqual('All Paid');
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
