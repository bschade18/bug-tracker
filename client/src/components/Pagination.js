import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  pagination,
  selectPage,
  pageNumbers,
  page,
  totalPages,
  component,
}) => {
  return (
    <nav>
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

Pagination.propTypes = {
  pagination: PropTypes.object,
  selectPage: PropTypes.func.isRequired,
  pageNumbers: PropTypes.array.isRequired,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  component: PropTypes.string,
};

export default Pagination;
