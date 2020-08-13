import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../components/SearchBar';

describe('<SearchBar />', () => {
  const onHandleChangeMock = jest.fn(() => {});
  const onHandleSubmitMock = jest.fn(() => {});
  const props = {
    value: 'toto',
    handleChange: () => onHandleChangeMock(),
    handleSubmit: () => onHandleSubmitMock(),
  };
  const wrapper = shallow(<SearchBar {...props} />)

  it('renders', () => {
    expect(wrapper.exists()).toBe(true);
  })
  
  it('should have a value', () => {
    expect(wrapper.find("[type='text']").length).toEqual(1);
  });
  
  it('should user text is echoed.', () => {
    const input = wrapper.find("[type='text']");
    input.simulate('change', {
      target: { value: "toto" }
    });
    expect(input.props().value).toEqual("toto");
  });

  it('when the form is submitted the event is cancelled', () => {
    let prevented = false;
    wrapper.find("[action='submit']").simulate("submit", {
      preventDefault: () => {
        prevented = true;
      }
    });
    expect(prevented).toBe(true);
  })
});
