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
