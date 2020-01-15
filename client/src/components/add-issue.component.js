import React, { Component } from "react";
import axios from "axios";

export default class CreateIssue extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "Bobby Schade",
      issueDescription: "",
      issueLog: [],
      issueTitle: "",
      date: "",
      number: "100000",
      issues: [],
      users: [],
      username: ""
    };
  }

  componentDidMount() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    axios
      .get("http://localhost:5000/issue/")
      .then(response => {
        this.setState({
          issues: response.data,
          date: today
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios.get("http://localhost:5000/users").then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        });
      }
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

  onChangeTitle(e) {
    this.setState({
      issueTitle: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let newNumber = this.state.issues[this.state.issues.length - 1].number + 1;

    const issue = {
      name: this.state.name,
      issueLog: this.state.issueLog.concat([
        {
          name: this.state.name,
          desc: this.state.issueDescription,
          date: this.state.date
        }
      ]),
      issueDescription: this.state.issueDescription,
      issueTitle: this.state.issueTitle,
      date: this.state.date,
      number: newNumber
    };

    console.log(issue);

    axios
      .post("http://localhost:5000/issue/add", issue)
      .then(res => console.log(res.data));

    window.location = "/";
  }
  render() {
    return (
      <div>
        <h3>Create New Issue Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.name}
            >
              <option>{this.state.name}</option>
              ); })}
            </select>
          </div>
          <div className="form-group">
            <label>Title </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.issueTitle}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Assign To: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
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
