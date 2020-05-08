import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AddIssue = ({ user: { team, name }, issues }) => {
  const [issueData, setIssueData] = useState({
    issueTitle: '',
    projectTitle: '',
    issueDescription: '',
    issueLog: [],
    assignedTo: '--Select User--',
    status: 'Open',
  });
  const [users, setUsers] = useState([]);
  const [isNewProject, setIsNewProject] = useState(false);

  const {
    issueTitle,
    projectTitle,
    issueDescription,
    issueLog,
    assignedTo,
    status,
  } = issueData;

  useEffect(() => {
    axios
      .get(`/users?team=${team}`)
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user) => user.name));
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      issueLog: [...issueLog, { name, desc: issueDescription }],
      team,
    };

    axios
      .post('/issue', newIssue, tokenConfig())
      .then((res) => console.log(res.data));

    setTimeout(() => (window.location = '/main'), 1000);
  };

  const tokenConfig = () => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  };

  const newProject = () => {
    setIsNewProject(true);
    setIssueData({ ...issueData, projectTitle: '' });
  };

  const listProjects = () => {
    const projects = issues.map((issue) => issue.projectTitle);

    const uniqueProjects = [...new Set(projects)];

    const sortProjects = uniqueProjects.sort((a, b) => {
      const projA = a.toLowerCase();
      const projB = b.toLowerCase();
      if (projA < projB) return -1;
      if (projA > projB) return 1;
      return 0;
    });

    return sortProjects;
  };

  let today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
  const year = String(today.getFullYear());

  today = month + '/' + day + '/' + year;

  return (
    <div className="container mt-3">
      <h3>Create New Issue Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>User: </label>
          <p>{name}</p>
        </div>
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
              {listProjects().map((project) => {
                return (
                  <option key={project} value={project}>
                    {project}
                  </option>
                );
              })}
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
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
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
  issues: PropTypes.array,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  issues: state.issues.issues,
});

export default connect(mapStateToProps)(AddIssue);
