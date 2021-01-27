import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

interface IssueFormProps {
  issueTitle: string,
  onChange: () => void,
  assignedTo: string,
  users: string[],
  status: string,
  today: string,
  projectTitle: string,
  onSubmit: () => void,
  component: string,
  isNewProject: boolean,
  listProjects: () => string[],
  newProject: () => void
}

const IssueForm = ({
  issueTitle,
  onChange,
  assignedTo,
  users,
  status,
  today,
  projectTitle,
  onSubmit,
  component,
  isNewProject,
  listProjects,
  newProject,
}: IssueFormProps) => {
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        {component === 'AddIssue' && (
          <>
            <div className="form-group">
              <label htmlFor="issue-title">Title:</label>
              <input
                type="text"
                required
                className="form-control form-input"
                name="issueTitle"
                value={issueTitle}
                onChange={onChange}
                id="issue-title"
                maxLength={25}
              />
            </div>
            <div className="form-group">
              <label htmlFor="project-title">Project:</label>
              {isNewProject ? (
                <input
                  type="text"
                  required
                  className="form-control form-input"
                  name="projectTitle"
                  value={projectTitle}
                  onChange={onChange}
                  id="project-title"
                  maxLength={25}
                />
              ) : (
                <select
                  required
                  className="form-control form-input"
                  value={projectTitle}
                  name="projectTitle"
                  onChange={onChange}
                  id="project-title"
                >
                  <option value="">--Select Project--</option>
                  {listProjects().map((project) => (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <input
              type="button"
              value="Add New Project"
              className="btn btn-primary mb-3"
              onClick={newProject}
            />
          </>
        )}
        <div className="form-group">
          <label htmlFor="issue-form-description">Description: </label>
          <textarea
            id="issue-form-description"
            required
            className="form-control description-input"
            name="issueDescription"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="assign-to">Assign To: </label>
          <select
            required
            className="form-control form-input"
            name="assignedTo"
            value={assignedTo}
            onChange={onChange}
            id="assign-to"
          >
            <option value="">--Select User--</option>
            {users.map((user, i) => (
              <option key={i} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="status-input">Status</label>
          <select
            required
            className="form-control form-input"
            name="status"
            value={status}
            onChange={onChange}
            id="status-input"
          >
            <option>Open</option>
            <option>Urgent</option>
            <option>Closed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>{today}</div>
        </div>

        <div className="form-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </form>
    </Fragment>
  );
};

IssueForm.propTypes = {
  issueTitle: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  assignedTo: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired,
  projectTitle: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  component: PropTypes.string,
  isNewProject: PropTypes.bool,
  listProjects: PropTypes.func,
  newProject: PropTypes.func,
};
export default IssueForm;
