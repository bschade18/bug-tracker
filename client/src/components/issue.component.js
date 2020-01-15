import React, { Component } from "react";
import axios from "axios";

export default class ReviewIssue extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      issueDescription: "",
      issueLog: [],
      issueTitle: "",
      date: "",
      number: ""
    };
  }

  componentDidMount() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    axios
      .get("http://localhost:5000/issue/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          issueTitle: response.data.issueTitle,
          date: today,
          number: response.data.number,
          name: response.data.name,
          issueLog: response.data.issueLog
        });
      })
      .catch(function(error) {
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

  onChangeDescription(e) {
    this.setState({
      issueDescription: e.target.value
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
      number: this.state.number
    };

    console.log(issue);

    axios
      .post(
        "http://localhost:5000/issue/update/" + this.props.match.params.id,
        issue
      )
      .then(res => console.log(res.data));

    window.location = "/";
  }
  render() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

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
            >
              <option>{this.state.name}</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea
              type="text"
              required
              className="form-control"
              value={this.state.issueDescription}
              onChange={this.onChangeDescription}
            />
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
