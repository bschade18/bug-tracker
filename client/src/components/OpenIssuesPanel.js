import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const OpenIssuesPanel = ({
  toggleShowClosed,
  projectTitle,
  onChange,
  listProjects,
}) => {
  return (
    <div>
      <h2 className="lg-heading">My Open Issues</h2>
      <div className="form-group">
        <Link to="/issue/new" className="link">
          Submit New Issue
        </Link>
      </div>
      <div className="form-group">
        <label className="bold-text" htmlFor="project-title">
          Project
        </label>
        <select
          required
          className="form-control form-input"
          value={projectTitle}
          name="projectTitle"
          onChange={onChange}
          id="project-title"
        >
          <option>--All--</option>
          {listProjects().map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>

        <div className="form-check form-check-inline mt-3">
          <label className="bold-text form-check-label" htmlFor="show-closed">
            Show Closed
          </label>
          <input
            type="checkbox"
            className="form-check-input ml-1"
            onClick={() => toggleShowClosed()}
            name="showCompleted"
            id="show-closed"
          />
        </div>

        <div className="form-check"></div>
      </div>
    </div>
  );
};

OpenIssuesPanel.propTypes = {
  projectTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  listProjects: PropTypes.func.isRequired,
  toggleShowClosed: PropTypes.func.isRequired,
};

export default OpenIssuesPanel;
