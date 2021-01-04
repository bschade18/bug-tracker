import React from 'react';

export const renderPageNumbers = (totalPages, page, selectPage) => {
  let pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <li key={i} className={page === i ? 'page-item active' : 'page-item'}>
        <a className="page-link" onClick={() => selectPage(i)} href="#!">
          {i}
        </a>
      </li>
    );
  }
  return pageNumbers;
};
