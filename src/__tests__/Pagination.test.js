import React from 'react';
import { shallow, mount } from 'enzyme';
import Pagination from '../components/Pagination';

describe('<Pagination />', () => {
  const onHandleNextMock = jest.fn();
  const onHandlePrevMock = jest.fn();
  const onHandleLastMock = jest.fn();
  const onHandleFirstMock = jest.fn();

  const props = {
    pageTotal: 1253,
    currentPage: 8,
    handleClickNext: () => onHandleNextMock(),
    handleClickPrev: () => onHandlePrevMock(),
    handleClickLast: () => onHandleLastMock(),
    handleClickFirst: () => onHandleFirstMock(),
  }
  const wrapper = shallow(<Pagination {...props} />)
  it('Shoulds render.', () => {
    expect(mount(<Pagination {...props} />)).toMatchSnapshot();
  })
  it('Should call "handleClickFirst" when clicking on the first paginate.', () => {
    wrapper.find("[data-jest='paginate-first']").simulate('click');
    expect(onHandleFirstMock).toHaveBeenCalled();
  });

  it('Should call "handleClickPrev" when clicking on the prev paginate.', () => {
    wrapper.find("[data-jest='paginate-prev']").simulate('click');
    expect(onHandlePrevMock).toHaveBeenCalled();
  });

  it('Should call "handleClickPrev" when clicking on the second prev paginate.', () => {
    wrapper.find("[data-jest='paginate-prev2']").simulate('click');
    expect(onHandlePrevMock).toHaveBeenCalled();
  });

  it('Should call "handleClickNext" when clicking on the next paginate.', () => {
    wrapper.find("[data-jest='paginate-next']").simulate('click');
    expect(onHandleNextMock).toHaveBeenCalled();
  });

  it('Should call "handleClickNext" when clicking on the second next paginate.', () => {
    wrapper.find("[data-jest='paginate-next2']").simulate('click');
    expect(onHandleNextMock).toHaveBeenCalled();
  });

  it('Should call "handleClickLast" when clicking on the last paginate.', () => {
    wrapper.find("[data-jest='paginate-last']").simulate('click');
    expect(onHandleLastMock).toHaveBeenCalled();
  });
});
