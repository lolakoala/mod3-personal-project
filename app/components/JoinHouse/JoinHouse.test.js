import React from "react";
import JoinHouse from './JoinHouse.js';
import { shallow } from "enzyme";


describe('JoinHouse component', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<JoinHouse handleChange={mockFn}
    getHouse={mockFn}
    createHouse={mockFn}/>);

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have three inputs', () => {
    const inputs = wrapper.find('input');

    expect(inputs.length).toEqual(3);
  });

  it('should have 2 buttons', () => {
    const buttons = wrapper.find('button');

    expect(buttons.length).toEqual(2);
  });

  it('should fire actions', () => {
    const input = wrapper.find('input').first();
    const button1 = wrapper.find('button').first();
    const button2 = wrapper.find('button').last();

    input.simulate('change', { target: { value: 'woof9' } });
    button1.simulate('click');
    button2.simulate('click');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
