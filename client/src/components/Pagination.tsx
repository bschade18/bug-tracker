import React from 'react';

interface PaginationProps {
  pagination: {
    prev?: number;
    next?: number;
  };
  page: number;
  pageNumbers: number[];
  totalPages: number;
  component: string;
  setPage: (page: number) => void;
}

const Pagination = ({
  pagination,
  pageNumbers,
  page,
  totalPages,
  component,
  setPage,
}: PaginationProps) => {
  return (
    <nav id="pagination-nav">
      <ul className="pagination">
        <li className={pagination.prev ? 'page-item' : 'page-item disabled'}>
          <a
            className="page-link"
            // @ts-ignore
            onClick={() => setPage(pagination.prev.page)}
            href="#!"
          >
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
          <a
            className="page-link"
            // @ts-ignore
            onClick={() => setPage(pagination.next.page)}
            href="#!"
          >
            <span>&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
