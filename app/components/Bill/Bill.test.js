import React from "react";
import Bill from './Bill.js';
import { shallow } from "enzyme";
import usersHouse from '../../mockData/usersHouse.js';

describe('Bill component', () => {
  const mockFn = jest.fn();
  const match = {
    params: {
      id: "b3019762705779"
    }
  };
  const wrapper = shallow(<Bill
    usersHouse={usersHouse}
    markBillPaid={mockFn}
    match={match}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a title', () => {
    
  })
});
