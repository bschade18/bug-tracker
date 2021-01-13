import React, { useState, useEffect } from 'react';
import IssueForm from './IssueForm';
import { todaysDate } from '../utils/dates';
import { sortProjects } from '../utils/sort';
import { addIssue } from '../actions/issueActions';
import { getUsers } from '../actions/userActions';
import Spinner from './layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AddIssue = ({
  user: { team, name },
  issues,
  history,
  addIssue,
  getUsers,
  users,
}) => {
  const [issueData, setIssueData] = useState({
    issueTitle: '',
    projectTitle: '',
    issueDescription: '',
    issueLog: [],
    assignedTo: '--Select User--',
    status: 'Open',
  });

  const [isNewProject, setIsNewProject] = useState(false);

  const {
    issueTitle,
    projectTitle,
    issueDescription,
    assignedTo,
    status,
  } = issueData;

  useEffect(() => {
    getUsers(team);
    // eslint-disable-next-line
  }, [team]);

  const onChange = (e) =>
    setIssueData({ ...issueData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    let newNumber;
    if (!issues[0]) {
      newNumber = 100000;
    } else {
      newNumber = issues[0].number + 1;
    }

    const newIssue = {
      name,
      number: newNumber,
      issueTitle,
      projectTitle,
      assignedTo,
      status,
      issueLog: [{ name, desc: issueDescription }],
      team,
    };

    addIssue(newIssue, history);
  };

  const newProject = () => {
    setIsNewProject(true);
    setIssueData({ ...issueData, projectTitle: '' });
  };

  const uniqueProjects = () => [
    ...new Set(issues.map((issue) => issue.projectTitle)),
  ];

  const listProjects = () => sortProjects(uniqueProjects());

  if (!issues) {
    return <Spinner />;
  }
  return (
    <div className="AddIssue container mt-3">
      <h3>Create New Issue</h3>
      <IssueForm
        onChange={onChange}
        assignedTo={assignedTo}
        users={users}
        status={status}
        today={todaysDate()}
        projectTitle={projectTitle}
        onSubmit={onSubmit}
        component="AddIssue"
        isNewProject={isNewProject}
        listProjects={listProjects}
        newProject={newProject}
      />
    </div>
  );
};

AddIssue.propTypes = {
  user: PropTypes.object.isRequired,
  issues: PropTypes.array.isRequired,
  addIssue: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  issues: state.issues.issues,
  users: state.users.users,
});

export default connect(mapStateToProps, { addIssue, getUsers })(AddIssue);
