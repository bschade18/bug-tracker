import React, { useState, useEffect } from 'react';
import { addIssue } from '../actions/issueActions';
import { getUsers } from '../actions/userActions';
import Spinner from './layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AddIssue = ({
  user: { team, name },
  issues,
  history,
  addIssue,
  getUsers,
  users,
}) => {
  const [issueData, setIssueData] = useState({
    issueTitle: '',
    projectTitle: '',
    issueDescription: '',
    issueLog: [],
    assignedTo: '--Select User--',
    status: 'Open',
  });

  const [isNewProject, setIsNewProject] = useState(false);

  const {
    issueTitle,
    projectTitle,
    issueDescription,
    assignedTo,
    status,
  } = issueData;

  useEffect(() => {
    getUsers(team);
    // eslint-disable-next-line
  }, [team]);

  const onChange = (e) =>
    setIssueData({ ...issueData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    let newNumber;
    if (!issues[0]) {
      newNumber = 100000;
    } else {
      newNumber = issues[0].number + 1;
    }

    const newIssue = {
      name,
      number: newNumber,
      issueTitle,
      projectTitle,
      issueDescription,
      assignedTo,
      status,
      issueLog: [{ name, desc: issueDescription }],
      team,
    };

    addIssue(newIssue, history);
  };

  const newProject = () => {
    setIsNewProject(true);
    setIssueData({ ...issueData, projectTitle: '' });
  };

  const listProjects = () => {
    const uniqueProjects = [
      ...new Set(issues.map((issue) => issue.projectTitle)),
    ];

    return uniqueProjects.sort((a, b) => {
      const projA = a.toLowerCase();
      const projB = b.toLowerCase();
      return projA < projB ? -1 : projA > projB ? 1 : 0;
    });
  };

  let today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = String(today.getFullYear());

  today = month + '/' + day + '/' + year;

  if (!issues) {
    return <Spinner />;
  }
  return (
    <div className="container mt-3">
      <h3>Create New Issue Log</h3>
      <form onSubmit={onSubmit}>
        {/* <div className="form-group">
          <label>User: </label>
          <p>{name}</p>
        </div> */}
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            required
            className="form-control"
            name="issueTitle"
            value={issueTitle}
            onChange={onChange}
            id="issue-title"
            maxLength="25"
          />
        </div>
        <div className="form-group">
          <label>Project</label>
          {isNewProject ? (
            <input
              type="text"
              required
              className="form-control"
              name="projectTitle"
              value={projectTitle}
              onChange={onChange}
              id="project-title"
              maxLength="25"
            />
          ) : (
            <select
              required
              className="form-control"
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

        <div className="form-group">
          <label>Description:</label>
          <textarea
            type="text"
            required
            className="form-control description-input"
            value={issueDescription}
            name="issueDescription"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Assign To:</label>
          <select
            required
            className="form-control"
            value={assignedTo}
            name="assignedTo"
            onChange={onChange}
            id="assign-to"
          >
            <option value="">--Select User--</option>
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            required
            className="form-control"
            value={status}
            name="status"
            onChange={onChange}
            id="status-input"
          >
            <option>Open</option>
            <option>Urgent</option>
            <option>Closed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date:</label>
          <div>{today}</div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Submit Issue"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

AddIssue.propTypes = {
  user: PropTypes.object.isRequired,
  issues: PropTypes.array.isRequired,
  addIssue: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  issues: state.issues.issues,
  users: state.users.users,
});

export default connect(mapStateToProps, { addIssue, getUsers })(AddIssue);