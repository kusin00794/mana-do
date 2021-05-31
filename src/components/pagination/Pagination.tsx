import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { IPagination, IPaginationInfo } from './Pagination.d';

import './Pagination.scss';

export const defaultPerPage = 10;
export const firstPage = 1;

export const defaultPaginationInfo: IPaginationInfo = { perPage: defaultPerPage, currentPage: firstPage };

const Pagination: FC<IPagination> = ({ total, perPage, handlePagination, externalCurrentPage }) => {
  const [currentPage, setCurrentPage] = useState<number>(externalCurrentPage || firstPage);
  const finalPerPage = perPage || defaultPerPage;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / finalPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    externalCurrentPage && setCurrentPage(externalCurrentPage);
  }, [externalCurrentPage]);

  const handleOnClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (currentPage === page) {
      return;
    }

    setCurrentPage(page);
    handlePagination({
      currentPage: page,
      perPage: finalPerPage,
    });
  };

  const handleOnClickNext = (e: React.MouseEvent) => {
    if (currentPage >= pageNumbers.length) {
      return;
    }

    e.preventDefault();
    const newCurrentPage = currentPage + 1;
    setCurrentPage(currentPage + 1);
    handlePagination({
      currentPage: newCurrentPage,
      perPage: finalPerPage,
    });
  };

  const handleOnClickPrev = (e: React.MouseEvent) => {
    if (currentPage <= firstPage) {
      return;
    }

    e.preventDefault();
    const newCurrentPage = currentPage - 1;
    setCurrentPage(currentPage - 1);
    handlePagination({
      currentPage: newCurrentPage,
      perPage: finalPerPage,
    });
  };

  return (
    <ul className="pagination">
      <li
        className={`pagination-prev pagination-item${currentPage <= firstPage ? ' disabled' : ''}`}
        onClick={handleOnClickPrev}
      >
        <Link to="#">
          <i className="fa fa-fw fa-angle-left" />
        </Link>
      </li>
      {pageNumbers.map((page, index) => {
        return (
          <li
            key={`pagination-item-${index}`}
            className={`pagination-page-${page} pagination-item${page === currentPage ? ' active' : ''}`}
            onClick={(e) => handleOnClick(e, page)}
          >
            <Link to="#">{page}</Link>
          </li>
        );
      })}
      <li
        className={`pagination-next pagination-item${currentPage >= pageNumbers.length ? ' disabled' : ''}`}
        onClick={handleOnClickNext}
      >
        <Link to="#">
          <i className="fa fa-fw fa-angle-right" />
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;
