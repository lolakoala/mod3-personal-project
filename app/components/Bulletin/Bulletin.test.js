import React from "react";
import Bulletin from './Bulletin.js';
import { shallow } from "enzyme";
import usersHouse from '../../mockData/usersHouse.js';

describe('bulletin component', () => {
  const bulletin = usersHouse.bulletins[0];
  const match = {
    params: {
      id: "1509567098747"
    }
  };
  const wrapper = shallow(<Bulletin
    usersHouse={usersHouse}
    match={match}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a title', () => {
    const title = wrapper.find('.title');

    expect(title.text()).toEqual(bulletin.title);
  });

  it('should have details', () => {
    const details = wrapper.find('.details');

    expect(details.text()).toEqual(bulletin.details);
  });

  it('should have posted info', () => {
    const postedInfo = wrapper.find('.posted-by-on');

    expect(postedInfo.text()).toEqual(`Posted by ${bulletin.postedBy.name} on ${bulletin.datePosted}`);
  });

  it('should have a list of who needs to read it', () => {
    const needsToRead = wrapper.find('.needs-to-read');

    expect(needsToRead.length).toEqual(usersHouse.users.length - bulletin.hasRead.length);
  });
});
