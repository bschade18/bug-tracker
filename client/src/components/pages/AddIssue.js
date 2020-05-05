import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AddIssue = ({ user }) => {
  const [issueData, setIssueData] = useState({
    issueTitle: '',
    projectTitle: '',
    issueDescription: '',
    issueLog: [],
    assignedTo: '--Select User--',
    status: 'Open',
  });
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);
  const [isNewProject, setIsNewProject] = useState(false);

  useEffect(() => {
    axios
      .get('/issue')
      .then((res) => {
        setIssues(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get('/users')
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user) => user.name));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChange = (e) =>
    setIssueData({ ...issueData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    // got issues so that i could see the previous issue number
    let newNumber = issues[0].number + 1 || 100000;

    const newIssue = {
      name: user.name,
      number: newNumber,
      issueTitle: issueData.issueTitle,
      projectTitle: issueData.projectTitle,
      issueDescription: issueData.projectTitle,
      assignedTo: issueData.assignedTo,
      status: issueData.status,
      issueLog: [
        ...issueData.issueLog,
        { name: user.name, desc: issueData.issueDescription },
      ],
    };

    // call addIssue action here

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

  let today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
  const year = String(today.getFullYear());

  today = month + '/' + day + '/' + year;

  const projects = issues.map((issue) => {
    return issue.projectTitle;
  });

  const uniqueProjects = [...new Set(projects)];

  const sortedProjects = uniqueProjects.sort((a, b) => {
    const projA = a.toLowerCase();
    const projB = b.toLowerCase();
    if (projA < projB) return -1;
    if (projA > projB) return 1;
    return 0;
  });

  return (
    <div className="container mt-3">
      <h3>Create New Issue Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <p>{user.name}</p>
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            required
            className="form-control"
            name="issueTitle"
            value={issueData.issueTitle}
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
              value={issueData.projectTitle}
              onChange={onChange}
              id="project-title"
              maxLength="25"
            />
          ) : (
            <select
              required
              className="form-control"
              value={issueData.projectTitle}
              name="projectTitle"
              onChange={onChange}
              id="project-title"
            >
              <option value="">--Select Project--</option>
              {sortedProjects.map((project) => {
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
            value={issueData.description}
            name="issueDescription"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Assign To:</label>
          <select
            required
            className="form-control"
            value={issueData.assignedTo}
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
            value={issueData.status}
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
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(AddIssue);
