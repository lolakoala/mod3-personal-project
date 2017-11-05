import React from "react";
import Dash from './Dash.js';
import { shallow } from "enzyme";
import usersHouse from '../../mockData/usersHouse.js';
import currentUser1 from '../../mockData/currentUser1.js';


describe('Dash component', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<Dash currentUser={currentUser1}
    loginSuccess={mockFn}
    createHouse={mockFn}
    usersHouse={usersHouse}
    getHouse={mockFn}
    markBillPaid={mockFn}
    addReaderToBulletin={mockFn}
    match={{ url: '/' }}
    markChoreDone={mockFn}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have default empty state', () => {
    const defaultState = {
      houseName: '',
      houseCode: '',
      allHouses: []
    };

    expect(wrapper.state()).toEqual(defaultState);
  });

  it('should have a bills list', () => {
    const billsList = wrapper.find('BillsList');

    expect(billsList.length).toEqual(1);
  });

  it('should have a chores list', () => {
    const choresList = wrapper.find('ChoresList');

    expect(choresList.length).toEqual(1);
  });

  it('should have a bulletins list', () => {
    const bulletinsList = wrapper.find('BulletinsList');

    expect(bulletinsList.length).toEqual(1);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
