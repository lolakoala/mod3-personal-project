import React from "react";
import Bill from './Bill.js';
import { shallow } from "enzyme";
import usersHouse from '../../mockData/usersHouse.js';
import currentUser1 from '../../mockData/currentUser1';

describe('Bill component', () => {
  const mockFn = jest.fn();
  const bill = usersHouse.bills[0];
  const match = {
    params: {
      id: "b3019762705779"
    }
  };
  const wrapper = shallow(<Bill
    usersHouse={usersHouse}
    markBillPaid={mockFn}
    currentUser={currentUser1}
    match={match}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a title', () => {
    const title = wrapper.find('.title');

    expect(title.text()).toEqual(`Bill: ${bill.title}`);
  });

  it('should have a dutedate', () => {
    const duedate = wrapper.find('.duedate');

    expect(duedate.text()).toEqual(`Due: ${bill.duedate}`);
  });

  it('should have a total', () => {
    const total = wrapper.find('.total');

    expect(total.text()).toEqual(`Total: ${bill.total}`);
  });

  it('should have posted info', () => {
    const postedInfo = wrapper.find('.posted-by-on');

    expect(postedInfo.text()).toEqual(`Posted by ${bill.postedBy.name} on ${bill.datePosted}`);
  });

  it('should have details', () => {
    const details = wrapper.find('.details');

    expect(details.text()).toEqual(`Details: ${bill.details}`);
  });

  it('should have a split total for each house member', () => {
    const splits = wrapper.find('.user-split');

    expect(splits.length).toEqual(bill.allUsersTotals.length);
  });

  it('should fire function', () => {
    const markPaid = wrapper.find('.mark-paid').first();

    markPaid.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
