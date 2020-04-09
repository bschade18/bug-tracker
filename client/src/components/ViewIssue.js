import React, { Component } from 'react';
import axios from 'axios';
import DeleteModal from './DeleteModal';

export default class ViewIssue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      number: '',
      issueTitle: '',
      issueDescription: '',
      issueLog: [],
      assignedTo: '',
      status: '',
      date: '',
      users: [],
    };
  }

  componentDidMount() {
    let today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const year = String(today.getFullYear());

    today = month + '/' + day + '/' + year;

    axios
      .get('/issue/' + this.props.match.params.id)
      .then((response) => {
        this.setState({
          issueTitle: response.data.data.issueTitle,
          date: today,
          number: response.data.data.number,
          name: response.data.data.name,
          issueLog: response.data.data.issueLog,
          assignedTo: response.data.data.assignedTo,
          status: response.data.data.status,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get('/users')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.name),
            username: response.data[0].name,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  LogList() {
    return this.state.issueLog.map((currentlog, i) => {
      const logDate = currentlog.date;
      const day = logDate.substring(8, 10).padStart(2, '0');
      const month = logDate.substring(6, 7).padStart(2, '0');
      const year = logDate.substring(0, 4);
      const date = month + '/' + day + '/' + year;
      return (
        <tr key={i}>
          <td>{currentlog.name}</td>
          <td id="log-description">{currentlog.desc}</td>
          <td>{date}</td>
        </tr>
      );
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      issueDescription,
      issueLog,
      issueTitle,
      date,
      number,
      assignedTo,
      status,
    } = this.state;

    const issue = {
      name,
      issueDescription,
      issueLog: issueLog.concat([
        {
          name: this.state.name,
          desc: this.state.issueDescription,
          date: this.state.date,
        },
      ]),
      issueTitle,
      date,
      number,
      assignedTo,
      status,
    };

    axios
      .put('/issue/' + this.props.match.params.id, issue)
      .then((res) => console.log(res.data));

    setTimeout(() => (window.location = '/main'), 500);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  statusList = () => {
    const statuses = ['Open', 'Urgent', 'Closed'];
    const filteredStatuses = statuses.filter(
      (currentstatus) => currentstatus.status !== this.state.status
    );

    return filteredStatuses.map((currentstatus) => {
      return (
        <option key={currentstatus} value={currentstatus}>
          {currentstatus}
        </option>
      );
    });
  };

  render() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    if (!this.state.issueLog.length) {
      return <div />;
    }
    return (
      <div className="container">
        <h3>Issue #{this.state.number}</h3>
        <h5>{this.state.issueTitle}</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <p>{this.state.name}</p>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea
              type="text"
              required
              className="form-control description-input"
              name="issueDescription"
              value={this.state.issueDescription}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Assign To: </label>
            <select
              required
              className="form-control"
              name="assignedTo"
              value={this.state.assignedTo}
              onChange={this.onChange}
              id="assign-to"
            >
              {this.state.users.map(function (user) {
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
              name="status"
              value={this.state.status}
              onChange={this.onChange}
              id="status-input"
            >
              {this.statusList()}
            </select>
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>{this.state.date}</div>
          </div>

          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.LogList()}</tbody>
        </table>
        <DeleteModal id={this.props.match.params.id} />
      </div>
    );
  }
}
