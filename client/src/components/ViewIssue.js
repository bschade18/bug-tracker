import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IssueLog from './IssueLog';
import DeleteModal from './DeleteModal';
import IssueForm from './IssueForm';
import Spinner from './layout/Spinner';
import { updateIssue } from '../actions/issueActions';
import { getUsers } from '../actions/userActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ViewIssue = ({ match, user, history, updateIssue, getUsers, users }) => {
  const [issueData, setIssueData] = useState({
    name: '',
    number: '',
    issueTitle: '',
    issueLog: [],
    assignedTo: '',
    status: '',
    issueDescription: '',
  });

  const {
    name,
    number,
    issueTitle,
    issueLog,
    assignedTo,
    status,
    issueDescription,
  } = issueData;

  useEffect(() => {
    axios
      .get('/issues/' + match.params.id)
      .then((res) => setIssueData(res.data.data))
      .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getUsers(user.team);
    // eslint-disable-next-line
  }, []);

  const onChange = (e) =>
    setIssueData({ ...issueData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedIssue = {
      issueDescription,
      issueLog: [...issueLog, { name: user.name, desc: issueDescription }],
      assignedTo,
      status,
    };

    updateIssue(match.params.id, updatedIssue, history);
  };

  const LogList = () => {
    return issueLog.map((log) => {
      const logDate = log.date;
      const day = logDate.substring(8, 10).padStart(2, '0');
      const month = logDate.substring(6, 7).padStart(2, '0');
      const year = logDate.substring(0, 4);
      const date = month + '/' + day + '/' + year;
      return (
        <tr key={log._id}>
          <td>{log.name}</td>
          <td id="log-description">{log.desc}</td>
          <td>{date}</td>
        </tr>
      );
    });
  };

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;

  if (!issueLog.length) {
    return <Spinner />;
  }
  return (
    <div className="container mt-3">
      <IssueForm
        number={number}
        issueTitle={issueTitle}
        name={name}
        issueDescription={issueDescription}
        onChange={onChange}
        assignedTo={assignedTo}
        users={users}
        status={status}
        today={today}
        onSubmit={onSubmit}
      />
      <IssueLog LogList={LogList} />
      <DeleteModal id={match.params.id} history={history} />
    </div>
  );
};

ViewIssue.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  users: state.users.users,
});

export default connect(mapStateToProps, { updateIssue, getUsers })(ViewIssue);
