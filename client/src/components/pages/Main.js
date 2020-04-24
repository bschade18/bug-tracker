import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Issue from '../Issue';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';
import ShowAlert from '../Alert';

const Main = ({
  user,
  alert,
  showAlert,
  isAuthenticated,
  allClosedIssues,
  allIssues,
}) => {
  const [issues, setIssues] = useState([]);
  const [closedIssues, setClosedIssues] = useState([]);
  const [number, setNumber] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [sortColumn, setSortColumn] = useState(false);

  useEffect(
    () => {
      setIssues(allIssues);
      setClosedIssues(allClosedIssues);
    },
    [allIssues],
    [closedIssues]
  );

  const onChange = (e) => {
    setProjectTitle(e.target.value);
    issuesList();
  };

  const issuesList = () => {
    let filter;
    if (projectTitle === '' || projectTitle === '--All--') {
      filter = issues.filter(
        (currentissue) =>
          currentissue.status !== 'Closed' &&
          currentissue.assignedTo === user.name
      );
    } else {
      filter = issues.filter(
        (currentissue) =>
          currentissue.status !== 'Closed' &&
          currentissue.assignedTo === user.name &&
          currentissue.projectTitle === projectTitle
      );
    }
    return filter.map((currentissue) => {
      return <Issue issue={currentissue} key={currentissue._id} />;
    });
  };

  const completedIssuesList = () => {
    return closedIssues.map((currentissue) => {
      return <Issue issue={currentissue} key={currentissue._id} />;
    });
  };

  const onChangeNumber = (e) => setNumber(e.target.value);

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

  // sorts on closed issues

  const sortClosedNumber = () => {
    let sort;
    if (sortColumn) {
      sort = closedIssues.sort(function (a, b) {
        return b.number - a.number;
      });
    } else {
      sort = closedIssues.sort(function (a, b) {
        return a.number - b.number;
      });
    }

    setClosedIssues(sort);
    setSortColumn(!sortColumn);
  };

  const sortClosedWord = (e) => {
    let sort;
    let name = e.target.getAttribute('name');
    if (sortColumn) {
      sort = closedIssues.sort(function (a, b) {
        if (a[name].toLowerCase() < b[name].toLowerCase()) {
          return -1;
        }
        if (a[name].toLowerCase() > b[name].toLowerCase()) {
          return 1;
        }

        return 0;
      });
    } else {
      sort = closedIssues.sort(function (a, b) {
        if (b[name].toLowerCase() < a[name].toLowerCase()) {
          return -1;
        }
        if (b[name].toLowerCase() > a[name].toLowerCase()) {
          return 1;
        }

        return 0;
      });
    }

    setClosedIssues(sort);
    setSortColumn(!sortColumn);
  };

  const sortClosedDate = () => {
    sortClosedNumber();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (number === '') {
      showAlert('Please enter an issue number to search');
    } else if (number.length !== 6) {
      showAlert('Please enter a valid number');
    } else {
      axios
        .get(`issue?&number=${number}&select=_id`)
        .then((res) => (window.location = `review/${res.data.data[0]._id}`))
        .catch((err) => console.log(err));
    }
  };

  const projects = issues.map(function (issue) {
    return issue.projectTitle;
  });

  const uniqueProjects = [...new Set(projects)];

  const sortProjects = uniqueProjects.sort((a, b) => {
    const projA = a.toLowerCase();
    const projB = b.toLowerCase();
    if (projA < projB) return -1;
    if (projA > projB) return 1;
    return 0;
  });

  if (!issues[0]) {
    return <Spinner />;
  }
  return (
    <div className="container mt-3">
      {isAuthenticated ? (
        <div>
          <h5>My Open Issues</h5>
          <div className="form-group">
            <Link to="/create" id="submit-issue-link">
              Submit New Issue
            </Link>
          </div>
          <div className="form-group">
            <label>Project: </label>
            <select
              required
              className="form-control"
              value={projectTitle}
              name="projectTitle"
              onChange={onChange}
              id="project-title"
            >
              <option>--All--</option>
              {sortProjects.map(function (project) {
                return (
                  <option key={project} value={project}>
                    {project}
                  </option>
                );
              })}
            </select>
          </div>
          {issuesList().length > 0 ? (
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>
                    Issue #{' '}
                    <i onClick={sortNumber} className="fa fa-fw fa-sort"></i>
                  </th>
                  <th>
                    Status{' '}
                    <i
                      name="status"
                      onClick={sortWord}
                      className="fa fa-fw fa-sort"
                    ></i>
                  </th>
                  <th>
                    Title{' '}
                    <i
                      name="issueTitle"
                      onClick={sortWord}
                      className="fa fa-fw fa-sort"
                    ></i>
                  </th>
                  <th>
                    Assigned To{' '}
                    <i
                      name="assignedTo"
                      onClick={sortWord}
                      className="fa fa-fw fa-sort"
                    ></i>
                  </th>
                  <th>
                    Date Initiated{' '}
                    <i onClick={sortDate} className="fa fa-fw fa-sort"></i>
                  </th>
                  <th>Open Issue</th>
                </tr>
              </thead>
              <tbody>{issuesList()}</tbody>
            </table>
          ) : (
            <p id="issues-message">You have no open issues</p>
          )}

          <h5 className="mt-5">Recently Closed Issues</h5>
          <table className="table mt-3">
            <thead className="thead-light">
              <tr>
                <th>
                  Issue #{' '}
                  <i
                    onClick={sortClosedNumber}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>
                  Status{' '}
                  <i
                    name="status"
                    onClick={sortClosedWord}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>
                  Title{' '}
                  <i
                    name="issueTitle"
                    onClick={sortClosedWord}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>
                  Assigned To{' '}
                  <i
                    name="assignedTo"
                    onClick={sortClosedWord}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>
                  Date Initiated{' '}
                  <i onClick={sortClosedDate} className="fa fa-fw fa-sort"></i>
                </th>
                <th>Open Issue</th>
              </tr>
            </thead>
            <tbody>{completedIssuesList()}</tbody>
          </table>

          <div className="form-group">
            <Link to={'/all'} id="see-more-link">
              See All
            </Link>
          </div>
          <ShowAlert alert={alert} />
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Search Issue # </label>
              <input
                type="text"
                className="form-control"
                onChange={onChangeNumber}
                id="issue-search"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                value="Search Issue"
                className="btn btn-primary"
              >
                Search Issue
              </button>
            </div>
          </form>
          <div className="form-group mb-4">
            <Link to={'/advanced'} id="advanced-search-link">
              Advanced Search
            </Link>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

Main.propTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Main;
