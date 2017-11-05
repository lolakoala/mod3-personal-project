import React from "react";
import Summary from './Summary.js';
import { shallow } from "enzyme";
import usersHouse from '../../mockData/usersHouse.js';
import currentUser1 from '../../mockData/currentUser1.js';

describe('Summary component', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<Summary usersHouse={usersHouse}
    currentUser={currentUser1}
    placeRendered={'summary'}
    markChoreDone={mockFn}
    claimChore={mockFn}
    addReaderToBulletin={mockFn}
    markBillPaid={mockFn}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have bulletins', () => {
    const bulletins = wrapper.find('BulletinsList');

    expect(bulletins.length).toEqual(1);
  });

  it('should have bills', () => {
    const bills = wrapper.find('BillsList');

    expect(bills.length).toEqual(1);
  });

  it('should have chores', () => {
    const chores = wrapper.find('ChoresList');

    expect(chores.length).toEqual(1);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
