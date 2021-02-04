import React from 'react';

interface PaginationProps {
  pagination: {
    prev?: number,
    next?: number
  },
  page: number,
  selectPage: (page: string) => void,
  pageNumbers: number[],
  totalPages: number,
  component: string
}

const Pagination = ({
  pagination,
  selectPage,
  pageNumbers,
  page,
  totalPages,
  component,
} : PaginationProps) => {
  return (
    <nav id='pagination-nav'>
      <ul className="pagination">
        <li className={pagination.prev ? 'page-item' : 'page-item disabled'}>
          <a className="page-link" onClick={() => selectPage('prev')} href="#!">
            <span>&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {pageNumbers}
        <li
          className={
            component === 'AdvancedSearch'
              ? page === totalPages
                ? 'page-item disabled'
                : 'page-item'
              : pagination.next
              ? 'page-item'
              : 'page-item disabled'
          }
        >
          <a className="page-link" onClick={() => selectPage('next')} href="#!">
            <span>&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};


export default Pagination;