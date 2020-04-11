import React, { Component } from 'react';
import axios from 'axios';

export default class AddIssue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: '100000',
      issueTitle: '',
      projectTitle: '',
      issueDescription: '',
      issueLog: [],
      assignedTo: '--Select User--',
      status: 'Open',
      date: '',
      issues: [],
      users: [],
      projects: [],
      isNewProject: false,
      totalIssues: null,
    };
  }

  componentDidMount() {
    let today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const year = String(today.getFullYear());

    today = month + '/' + day + '/' + year;

    axios
      .get('/issue')
      .then((res) => {
        this.setState({
          issues: res.data.data,
          date: today,
          totalIssues: res.data.totalIssues,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get('/users')
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map((user) => user.name),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      issues,
      issueTitle,
      projectTitle,
      issueDescription,
      assignedTo,
      status,
      date,
      issueLog,
    } = this.state;

    let newNumber = issues[0].number + 1;

    const newIssue = {
      name: this.props.user.name,
      number: newNumber,
      issueTitle,
      projectTitle,
      issueDescription,
      assignedTo,
      status,
      date,
      issueLog: issueLog.concat([
        {
          name: this.props.user.name,
          desc: issueDescription,
          date: date,
        },
      ]),
    };

    axios
      .post('/issue', newIssue, this.tokenConfig())
      .then((res) => console.log(res.data));

    setTimeout(() => (window.location = '/main'), 500);
  };

  tokenConfig = () => {
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

  newProject = () => {
    this.setState({
      isNewProject: true,
      projectTitle: '',
    });
  };

  render() {
    const projects = this.state.issues.map((issue) => {
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
      <div className="container">
        <h3>Create New Issue Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <p>{this.props.user.name}</p>
          </div>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              required
              className="form-control"
              name="issueTitle"
              value={this.state.issueTitle}
              onChange={this.onChange}
              id="issue-title"
              maxLength="25"
            />
          </div>
          <div className="form-group">
            <label>Project</label>
            {this.state.isNewProject ? (
              <input
                type="text"
                required
                className="form-control"
                name="projectTitle"
                value={this.state.projectTitle}
                onChange={this.onChange}
                id="project-title"
                maxLength="25"
              />
            ) : (
              <select
                required
                className="form-control"
                value={this.state.projectTitle}
                name="projectTitle"
                onChange={this.onChange}
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
            onClick={this.newProject}
          />

          <div className="form-group">
            <label>Description:</label>
            <textarea
              type="text"
              required
              className="form-control description-input"
              value={this.state.description}
              name="issueDescription"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Assign To:</label>
            <select
              required
              className="form-control"
              value={this.state.assignedTo}
              name="assignedTo"
              onChange={this.onChange}
              id="assign-to"
            >
              <option value="">--Select User--</option>
              {this.state.users.map((user) => {
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
              value={this.state.status}
              name="status"
              onChange={this.onChange}
              id="status-input"
            >
              <option>Open</option>
              <option>Urgent</option>
              <option>Closed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date:</label>
            <div>{this.state.date}</div>
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
  }
}
