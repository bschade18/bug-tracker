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
    projectTitle: '',
  });

  const {
    name,
    number,
    issueTitle,
    issueLog,
    assignedTo,
    status,
    issueDescription,
    projectTitle,
  } = issueData;

  useEffect(() => {
    async function getIssue() {
      try {
        const res = await axios.get('/issues/' + match.params.id);
        setIssueData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getIssue();
  }, [match.params.id]);

  useEffect(() => {
    getUsers(user.team);
    // eslint-disable-next-line
  }, []);

  const onChange = (e) =>
    setIssueData({ ...issueData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedIssue = {
      issueLog: [...issueLog, { name: user.name, desc: issueDescription }],
      assignedTo,
      status,
    };

    updateIssue(match.params.id, updatedIssue, history);
  };

  const LogList = () =>
    issueLog.map((log) => {
      const logDate = log.date;
      const day = logDate.substring(8, 10).padStart(2, '0');
      const month = logDate.substring(5, 7).padStart(2, '0');
      const year = logDate.substring(0, 4);
      const date = month + '/' + day + '/' + year;
      return (
        <tr key={log._id}>
          <td>{log.name}</td>
          <td className="log-description">{log.desc}</td>
          <td>{date}</td>
        </tr>
      );
    });

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
      <button className="btn btn-light" onClick={() => history.goBack()}>
        Go Back
      </button>
      <h3 className="text-center">{issueTitle}</h3>
      <h5 className="text-center">{projectTitle}</h5>
      <p>Issue #{number}</p>
      <IssueForm
        issueTitle={issueTitle}
        name={name}
        onChange={onChange}
        assignedTo={assignedTo}
        users={users}
        status={status}
        today={today}
        projectTitle={projectTitle}
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
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  users: state.users.users,
});

export default connect(mapStateToProps, { updateIssue, getUsers })(ViewIssue);
