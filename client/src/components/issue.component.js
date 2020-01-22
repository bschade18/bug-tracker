import React, { Component } from "react";
import axios from "axios";
import "../App.css";

export default class ReviewIssue extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeAssignee = this.onChangeAssignee.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);

    this.state = {
      name: "",
      issueDescription: "",
      issueLog: [],
      issueTitle: "",
      date: "",
      number: "",
      users: [],
      username: "",
      assignedTo: "",
      status: ""
    };
  }

  componentDidMount() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    axios
      .get("/issue/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          issueTitle: response.data.issueTitle,
          date: today,
          number: response.data.number,
          name: response.data.name,
          issueLog: response.data.issueLog,
          assignedTo: response.data.assignedTo,
          status: response.data.status
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get("/users")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  LogList() {
    return this.state.issueLog.map((currentlog, i) => {
      return (
        <tr key={i}>
          <td>{currentlog.name}</td>
          <td>{currentlog.desc}</td>
          <td>{currentlog.date.substring(0, 10)}</td>
        </tr>
      );
    });
  }

  onChangeAssignee(e) {
    this.setState({
      assignedTo: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      issueDescription: e.target.value
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const issue = {
      name: this.state.name,
      issueDescription: this.state.issueDescription,
      issueLog: this.state.issueLog.concat([
        {
          name: this.state.name,
          desc: this.state.issueDescription,
          date: this.state.date
        }
      ]),
      issueTitle: this.state.issueTitle,
      date: this.state.date,
      number: this.state.number,
      assignedTo: this.state.assignedTo,
      status: this.state.status
    };

    console.log(issue);

    axios
      .post("/issue/update/" + this.props.match.params.id, issue)
      .then(res => console.log(res.data));

    window.location = "/";
  }
  render() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    if (!this.state.issueLog.length) {
      return <div />;
    }
    return (
      <div>
        <h3>Issue #{this.state.number}</h3>
        <h5>{this.state.issueTitle}</h5>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeUsername}
              id="change-username"
            >
              <option>{this.state.name}</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea
              type="text"
              required
              className="form-control description-input"
              value={this.state.issueDescription}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Assign To: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.assignedTo}
              onChange={this.onChangeAssignee}
              id="assign-to"
            >
              {this.state.users.map(function(user) {
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
              ref="userInput"
              required
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}
              id="status-input"
            >
              <option>{this.state.status}</option>
              <option>Open</option>
              <option>Priority</option>
              <option>Closed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date: </label>
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
      </div>
    );
  }
}
