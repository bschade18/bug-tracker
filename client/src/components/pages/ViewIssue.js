import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DeleteModal from '../DeleteModal';
import PropTypes from 'prop-types';

const ViewIssue = ({ match, user }) => {
  const [issueData, setIssueData] = useState({
    name: '',
    number: '',
    issueTitle: '',
    issueLog: [],
    assignedTo: '',
    status: '',
    issueDescription: '',
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('/issue/' + match.params.id)
      .then((response) => {
        setIssueData({
          name: response.data.data.name,
          number: response.data.data.number,
          issueTitle: response.data.data.issueTitle,
          issueLog: response.data.data.issueLog,
          assignedTo: response.data.data.assignedTo,
          status: response.data.data.status,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`/users?team=${user.team}`)
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.name));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  const LogList = () => {
    return issueData.issueLog.map((currentlog, i) => {
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
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const issue = {
      name: issueData.name,
      issueDescription: issueData.issueDescription,
      issueLog: [
        ...issueData.issueLog,
        { name: user.name, desc: issueData.issueDescription },
      ],
      issueTitle: issueData.issueTitle,
      number: issueData.number,
      assignedTo: issueData.assignedTo,
      status: issueData.status,
    };

    axios
      .put('/issue/' + match.params.id, issue)
      .then((res) => console.log(res.data));

    setTimeout(() => (window.location = '/main'), 500);
  };

  const onChange = (e) =>
    setIssueData({ ...issueData, [e.target.name]: e.target.value });

  const statusList = () => {
    const statuses = ['Open', 'Urgent', 'Closed'];
    const filteredStatuses = statuses.filter(
      (currentstatus) => currentstatus.status !== issueData.status
    );

    return filteredStatuses.map((currentstatus) => {
      return (
        <option key={currentstatus} value={currentstatus}>
          {currentstatus}
        </option>
      );
    });
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  if (!issueData.issueLog.length) {
    return <div />;
  }
  return (
    <div className="container mt-3">
      <h3>Issue #{issueData.number}</h3>
      <h5 style={{ textAlign: 'center' }}>{issueData.issueTitle}</h5>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>User: </label>
          <p>{issueData.name}</p>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <textarea
            type="text"
            required
            className="form-control description-input"
            name="issueDescription"
            value={issueData.issueDescription}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Assign To: </label>
          <select
            required
            className="form-control"
            name="assignedTo"
            value={issueData.assignedTo}
            onChange={onChange}
            id="assign-to"
          >
            {users.map(function (user) {
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
            value={issueData.status}
            onChange={onChange}
            id="status-input"
          >
            {statusList()}
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
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{LogList()}</tbody>
      </table>
      <DeleteModal id={match.params.id} />
    </div>
  );
};

ViewIssue.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ViewIssue);
