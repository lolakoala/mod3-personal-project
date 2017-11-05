import React from "react";
import HouseList from './HouseList.js';
import { shallow } from "enzyme";
import usersHouse from '../../mockData/usersHouse.js';
import currentUser1 from '../../mockData/currentUser1.js';


describe('HouseList component', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<HouseList usersHouse={usersHouse}
    currentUser={currentUser1}
    addReaderToBulletin={mockFn}
    match={{}}
    markBillPaid={mockFn}
    markChoreDone={mockFn}
    claimChore={mockFn}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have default state', () => {
    const defaultState = {
      currentView: '',
      searchInput: ''
    };

    expect(wrapper.state()).toEqual(defaultState);
  });

  it('should change state and content when clicking summary', () => {
    const viewSummary = wrapper.find('.view-summary');

    viewSummary.simulate('click');
    expect(wrapper.state().currentView).toEqual('summary');
    expect(wrapper.find('Summary').length).toEqual(1);
  });

  it('should change state and content when clicking bills', () => {
    const viewBills = wrapper.find('.view-bills');

    viewBills.simulate('click');
    expect(wrapper.state().currentView).toEqual('bills');
    expect(wrapper.find('BillsList').length).toEqual(1);
  });

  it('should change state and content when clicking bulletins', () => {
    const viewBulletins = wrapper.find('.view-bulletins');

    viewBulletins.simulate('click');
    expect(wrapper.state().currentView).toEqual('bulletins');
    expect(wrapper.find('BulletinsList').length).toEqual(1);
  });

  it('should change state and content when clicking chores', () => {
    const viewChores = wrapper.find('.view-chores');

    viewChores.simulate('click');
    expect(wrapper.state().currentView).toEqual('chores');
    expect(wrapper.find('ChoresList').length).toEqual(1);
  });

  it('should change state and content when inputing search', () => {
    const searchField = wrapper.find('input').first();

    searchField.simulate('change', { target: { value: 'wa' } });
    expect(wrapper.state().currentView).toEqual('search');
    expect(wrapper.state().searchInput).toEqual('wa');
    expect(wrapper.find('BulletinsList').length).toEqual(1);
    expect(wrapper.find('ChoresList').length).toEqual(1);
    expect(wrapper.find('BillsList').length).toEqual(1);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
