import React from 'react';

export const renderPageNumbers = (totalPages, page, selectPage) => {
  const pageNumbers = [];

  if (totalPages > 3) {
    const min = Math.max(page - 2, 2);
    const max = Math.min(page + 2, totalPages - 1);
    // always show first page
    pageNumbers.push(
      <li key={1} className={page === 1 ? 'page-item active' : 'page-item'}>
        <a className="page-link" onClick={() => selectPage(1)} href="#!">
          1
        </a>
      </li>
    );
    // more than one space away from the beginning so we need a separator
    if (min > 2) {
      pageNumbers.push('...');
    }
    // generate middle numbers
    for (let i = min; i < max + 1; i++) {
      pageNumbers.push(
        <li key={i} className={page === i ? 'page-item active' : 'page-item'}>
          <a className="page-link" onClick={() => selectPage(i)} href="#!">
            {i}
          </a>
        </li>
      );
    }
    // more than one space away from the end so we need a separator
    if (max < totalPages - 1) {
      pageNumbers.push('...');
    }
    // always show the last page
    pageNumbers.push(
      <li
        key={totalPages}
        className={page === totalPages ? 'page-item active' : 'page-item'}
      >
        <a
          className="page-link"
          onClick={() => selectPage(totalPages)}
          href="#!"
        >
          {totalPages}
        </a>
      </li>
    );
  } else {
    // special case for three or less because the above logic won't work
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={page === i ? 'page-item active' : 'page-item'}>
          <a className="page-link" onClick={() => selectPage(i)} href="#!">
            {i}
          </a>
        </li>
      );
    }
  }

  return pageNumbers;
};
