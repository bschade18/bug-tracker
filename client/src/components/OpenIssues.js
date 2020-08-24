import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const OpenIssues = ({
  projectTitle,
  onChange,
  listProjects,
  issuesList,
  sortNumber,
  sortWord,
  sortDate,
  issues,
}) => {
  return (
    <Fragment>
      <h2 className="lg-heading">My Open Issues</h2>
      <div className="form-group">
        <Link to="/issue/new" id="submit-issue-link">
          Submit New Issue
        </Link>
      </div>
      <div className="form-group">
        <label className="bold-text">Project</label>
        <select
          required
          className="form-control"
          value={projectTitle}
          name="projectTitle"
          onChange={onChange}
          id="project-title"
        >
          <option>--All--</option>
          {listProjects().map(function (project) {
            return (
              <option key={project} value={project}>
                {project}
              </option>
            );
          })}
        </select>
      </div>
      {issuesList().length > 0 ? (
        <div className="table-responsive">
          <table className="table">
            <thead className="light-bg">
              <tr>
                <th>
                  Issue #{' '}
                  <i
                    onClick={(e) => sortNumber(issues, e)}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>
                  Status{' '}
                  <i
                    name="status"
                    onClick={(e) => sortWord(issues, e)}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>
                  Title{' '}
                  <i
                    name="issueTitle"
                    onClick={(e) => sortWord(issues, e)}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>
                  Assigned To{' '}
                  <i
                    name="assignedTo"
                    onClick={(e) => sortWord(issues, e)}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>
                  Date Initiated{' '}
                  <i
                    onClick={() => sortDate(issues)}
                    className="fa fa-fw fa-sort"
                  ></i>
                </th>
                <th>Open Issue</th>
              </tr>
            </thead>
            <tbody>{issuesList()}</tbody>
          </table>
        </div>
      ) : (
        <p className="issues-message">
          <em>No open issues</em>
        </p>
      )}
    </Fragment>
  );
};

OpenIssues.propTypes = {
  projectTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  listProjects: PropTypes.func.isRequired,
  issuesList: PropTypes.func.isRequired,
  sortNumber: PropTypes.func.isRequired,
  sortWord: PropTypes.func.isRequired,
  sortDate: PropTypes.func.isRequired,
  issues: PropTypes.array.isRequired,
};

export default OpenIssues;
