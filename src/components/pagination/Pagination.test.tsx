import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, wait } from '@testing-library/react';

import { testSnapshots } from '../../utils/test';
import Pagination from './Pagination';

const Wrapper = (props: any) => (
  <BrowserRouter>
    <Pagination {...props} />
  </BrowserRouter>
);

const defaultProps = {
  total: 21,
  handlePagination: jest.fn(),
};

describe('Pagination Page', () => {
  testSnapshots(Wrapper, [
    {
      props: {},
      description: 'render Pagination Page',
    },
  ]);
});

describe('Pagination logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();
  });

  test('Should render correct prev button', async () => {
    const wrapper = render(<Wrapper {...defaultProps} />);
    const { container } = wrapper;
    const prevBtn = container.querySelector('.pagination-prev');
    expect(prevBtn).toHaveClass('disabled');
    await wait(() => {
      if (prevBtn) {
        fireEvent.click(prevBtn);
      }
    });
    expect(defaultProps.handlePagination).not.toHaveBeenCalled();
  });

  test('Should render correct next button', async () => {
    const wrapper = render(<Wrapper {...defaultProps} externalCurrentPage={3} />);
    const { container } = wrapper;
    const nextBtn = container.querySelector('.pagination-next');
    expect(nextBtn).toHaveClass('disabled');
    await wait(() => {
      if (nextBtn) {
        fireEvent.click(nextBtn);
      }
    });
    expect(defaultProps.handlePagination).not.toHaveBeenCalled();
  });

  test('Should have correct behavior when click next button and prev', async () => {
    const wrapper = render(<Wrapper {...defaultProps} />);
    const { container, rerender } = wrapper;

    const nextBtn = container.querySelector('.pagination-next');
    const expectedNextValue = { currentPage: 2, perPage: 10 };
    await wait(() => {
      if (nextBtn) {
        fireEvent.click(nextBtn);
      }
    });
    expect(defaultProps.handlePagination).toHaveBeenCalledWith(expectedNextValue);

    rerender(<Wrapper {...defaultProps} />);

    const prevBtn = container.querySelector('.pagination-prev');
    const expectedPrevValue = { currentPage: 1, perPage: 10 };
    await wait(() => {
      if (prevBtn) {
        fireEvent.click(prevBtn);
      }
    });
    expect(defaultProps.handlePagination).toHaveBeenCalledWith(expectedPrevValue);
  });

  test('Should have correct behavior when click item', async () => {
    const wrapper = render(<Wrapper {...defaultProps} />);
    const { container } = wrapper;

    const firstPage = container.querySelector('.pagination-page-1');
    await wait(() => {
      if (firstPage) {
        fireEvent.click(firstPage);
      }
    });
    expect(defaultProps.handlePagination).not.toHaveBeenCalled();

    const lastPage = container.querySelector('.pagination-page-2');
    const expectedSecPageValue = { currentPage: 2, perPage: 10 };
    await wait(() => {
      if (lastPage) {
        fireEvent.click(lastPage);
      }
    });
    expect(defaultProps.handlePagination).toHaveBeenCalledWith(expectedSecPageValue);
  });
});
