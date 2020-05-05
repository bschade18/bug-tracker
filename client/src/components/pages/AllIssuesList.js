import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Issue from '../Issue';
import Spinner from '../Spinner';

const AllIssuesList = () => {
  const [issues, setIssues] = useState([]);
  const [sortColumn, setSortColumn] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    let page = 1;
    axios
      .get(`/issue?page=${page}&limit=20`)
      .then((response) => {
        setIssues(response.data.data);
        setPagination(response.data.pagination);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.log(error));
  }, []);

  const IssuesList = () => {
    return issues.map((issue) => {
      return <Issue issue={issue} key={issue._id} />;
    });
  };

  // add to app level state and pass down

  const sortNumber = () => {
    let sort;
    if (sortColumn) {
      sort = issues.sort((a, b) => {
        return b.number - a.number;
      });
    } else {
      sort = issues.sort((a, b) => {
        return a.number - b.number;
      });
    }
    setIssues(sort);
    setSortColumn(!sortColumn);
  };

  const sortWord = (e) => {
    let name = e.target.getAttribute('name');
    let sort;

    if (sortColumn) {
      sort = issues.sort(function (a, b) {
        if (a[name].toLowerCase() < b[name].toLowerCase()) {
          return -1;
        }
        if (a[name].toLowerCase() > b[name].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else {
      sort = issues.sort(function (a, b) {
        if (b[name].toLowerCase() < a[name].toLowerCase()) {
          return -1;
        }
        if (b[name].toLowerCase() > a[name].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }
    setIssues(sort);
    setSortColumn(!sortColumn);
  };

  const sortDate = () => {
    sortNumber();
  };

  const selectPage = (page) => {
    if (page === 'next') {
      page = pagination.next.page;
    } else if (page === 'prev') {
      page = pagination.prev.page;
    }
    axios
      .get(`/issue?page=${page}&limit=20`)
      .then((response) => {
        setIssues(response.data.data);
        setPagination(response.data.pagination);
        setPage(page);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let rows = [];
  for (let i = 1; i <= totalPages; i++) {
    rows.push(
      <li key={i} className={page === i ? 'page-item active' : 'page-item'}>
        <a className="page-link" onClick={() => selectPage(i)} href="#!">
          {i}
        </a>
      </li>
    );
  }
  if (!issues[0]) {
    return <Spinner />;
  }
  return (
    <div className="container mt-3">
      <h5>All Issues</h5>
      <table className="table mt-4">
        <thead className="thead-light">
          <tr>
            <th>
              Issue #<i onClick={sortNumber} className="fa fa-fw fa-sort"></i>
            </th>
            <th>
              Status
              <i
                name="status"
                onClick={sortWord}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Title
              <i
                name="issueTitle"
                onClick={sortWord}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Assigned To
              <i
                name="assignedTo"
                onClick={sortWord}
                className="fa fa-fw fa-sort"
              ></i>
            </th>
            <th>
              Date Initiated
              <i onClick={sortDate} className="fa fa-fw fa-sort"></i>
            </th>
            <th>Open Issue</th>
          </tr>
        </thead>
        <tbody>{IssuesList()}</tbody>
      </table>

      <nav>
        <ul className="pagination">
          <li className={pagination.prev ? 'page-item' : 'page-item disabled'}>
            <a
              className="page-link"
              onClick={() => selectPage('prev')}
              href="#!"
            >
              <span>&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>

          {rows}

          <li className={pagination.next ? 'page-item' : 'page-item disabled'}>
            <a
              className="page-link"
              onClick={() => selectPage('next')}
              href="#!"
            >
              <span>&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AllIssuesList;