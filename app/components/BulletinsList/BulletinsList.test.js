import React from "react";
import BulletinsList from './BulletinsList.js';
import { shallow } from "enzyme";
import usersHouse from '../../mockData/usersHouse.js';
import currentUser1 from '../../mockData/currentUser1.js';

describe('BulletinsList component', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<BulletinsList usersHouse={usersHouse}
    currentUser={currentUser1}
    addReaderToBulletin={mockFn}
    placeRendered={'/houselist'}
    searchValue={''}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have headers', () => {
    const headers = wrapper.find('.bulletin-headers');

    expect(headers.length).toEqual(1);
  });

  it('should have a title column header', () => {
    const titleHeader = wrapper.find('.title-header');

    expect(titleHeader.text()).toEqual('Title');
  });

  it('should have a dateposted column header', () => {
    const datepostedHeader = wrapper.find('.date-header');

    expect(datepostedHeader.text()).toEqual('Date Posted');
  });

  it('should have a all read header', () => {
    const allReadHeader = wrapper.find('.allread-header');

    expect(allReadHeader.text()).toEqual('All Read');
  });

  it('should have display all bulletins of the house', () => {
    const bulletins = wrapper.find('.bulletin');

    expect(bulletins.length).toEqual(usersHouse.bulletins.length);
  });

  it('should fire action', () => {
    const addReader = wrapper.find('.bulletin-title').first();

    addReader.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
