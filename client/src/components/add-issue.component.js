import React, { Component } from "react";
import axios from "axios";
import "../App.css";

export default class CreateIssue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Bobby Schade",
      issueDescription: "",
      issueLog: [],
      issueTitle: "",
      date: "",
      number: "100000",
      issues: [],
      users: [],
      status: "Open",
      assignedTo: ""
    };
  }

  componentDidMount() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    axios
      .get("/issue/")
      .then(response => {
        this.setState({
          issues: response.data,
          date: today
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("/users")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.name),
            assignedTo: response.data[0].name
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let newNumber = this.state.issues[this.state.issues.length - 1].number + 1;

    const issue = {
      name: this.props.user.name,
      issueLog: this.state.issueLog.concat([
        {
          name: this.props.user.name,
          desc: this.state.issueDescription,
          date: this.state.date
        }
      ]),
      issueDescription: this.state.issueDescription,
      issueTitle: this.state.issueTitle,
      date: this.state.date,
      number: newNumber,
      assignedTo: this.state.assignedTo,
      status: this.state.status
    };

    console.log(issue);

    axios
      .post("/issue/add", issue, this.tokenConfig())
      .then(res => console.log(res.data));

    window.location = "/";
  };

  tokenConfig = () => {
    // get token from local storage
    const token = localStorage.getItem("token");

    // headers
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    // if token, add to headers
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  };

  render() {
    return (
      <div>
        <h3>Create New Issue Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <p>{this.props.user.name}</p>
          </div>
          <div className="form-group">
            <label>Title: </label>
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
            <label>Description: </label>
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
            <label>Assign To: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.assignedTo}
              name="assignedTo"
              onChange={this.onChange}
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
              name="status"
              onChange={this.onChange}
              id="status-input"
            >
              <option>{this.state.status}</option>
              <option>Priority</option>
              <option>Closed</option>
              <option>Wait</option>
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
      </div>
    );
  }
}
