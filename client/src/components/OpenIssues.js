import React, { Fragment } from 'react';
import IssueTable from './IssueTable';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const OpenIssues = ({
  projectTitle,
  onChange,
  listProjects,
  issuesList,
  issues,
}) => {
  return (
    <Fragment>
      <h2 className="lg-heading">My Open Issues</h2>
      <div className="form-group">
        <Link to="/issue/new" className="link">
          Submit New Issue
        </Link>
      </div>
      <div className="form-group">
        <label className="bold-text">Project</label>
        <select
          required
          className="form-control form-input"
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
      {issuesList().length ? (
        <IssueTable list={issues} displayIssuesFunc={issuesList} />
      ) : (
        <p className="issues-message mt-4">
          <em>There are no issues assigned to you</em>
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
  issues: PropTypes.array.isRequired,
};

export default OpenIssues;
