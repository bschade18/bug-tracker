import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Issue from './Issue';
import Spinner from './layout/Spinner';
import PropTypes from 'prop-types';
import ShowAlert from './Alert';
import OpenIssues from './OpenIssues';
import ClosedIssues from './ClosedIssues';
import HomeSearch from './HomeSearch';

import {
  getIssues,
  getRecentClosed,
  setProject,
} from '../actions/issueActions';
import { setErrors } from '../actions/errorActions';

const Home = ({
  user: { team, name },
  getIssues,
  issues: { issues, closed, loading, currentProject },
  getRecentClosed,
  setErrors,
  error,
  setProject,
  history,
}) => {
  const [number, setNumber] = useState('');
  const [sortColumn, setSortColumn] = useState(false);

  useEffect(() => {
    console.log('home effect');
    getIssues(team);
    getRecentClosed(team);
    // eslint-disable-next-line
  }, [team, issues.length]);

  const listProjects = () => {
    const projects = issues
      .filter((issue) => issue.assignedTo === name && issue.status !== 'Closed')
      .map((issue) => issue.projectTitle);
    const uniqueProjects = [...new Set(projects)];

    return uniqueProjects.sort((a, b) => {
      const projA = a.toLowerCase();
      const projB = b.toLowerCase();
      return projA < projB ? -1 : projA > projB ? 1 : 0;
    });
  };

  const onChange = (e) => {
    setProject(e.target.value);
    issuesList();
  };

  const issuesList = () => {
    let filter;
    if (currentProject === '' || currentProject === '--All--') {
      filter = issues.filter(
        (issue) => issue.status !== 'Closed' && issue.assignedTo === name
      );
    } else {
      filter = issues.filter(
        (issue) =>
          issue.status !== 'Closed' &&
          issue.assignedTo === name &&
          issue.projectTitle === currentProject
      );
    }
    return filter.map((issue) => {
      return <Issue issue={issue} key={issue._id} />;
    });
  };

  const completedIssuesList = () => {
    return closed.map((issue) => {
      return <Issue issue={issue} key={issue._id} />;
    });
  };

  const sortNumber = (list) => {
    list.sort((a, b) =>
      sortColumn ? b.number - a.number : a.number - b.number
    );

    setSortColumn(!sortColumn);
  };

  const sortWord = (list, e) => {
    let name = e.target.getAttribute('name');

    list.sort((a, b) => {
      const wordA = a[name].toLowerCase();
      const wordB = b[name].toLowerCase();
      if (sortColumn) return wordA < wordB ? -1 : wordA > wordB ? 1 : 0;
      else return wordB < wordA ? -1 : wordB > wordA ? 1 : 0;
    });

    setSortColumn(!sortColumn);
  };

  const sortDate = (list) => sortNumber(list);

  const onChangeNumber = (e) => setNumber(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    if (number === '') {
      setErrors('Please enter an issue number to search');
    } else if (number.length !== 6 || !/^\d+$/.test(number)) {
      setErrors('Please enter a valid number');
    } else {
      axios
        .get(`issues?&number=${number}&select=_id`)
        .then((res) => history.push(`issue/${res.data.data[0]._id}`))
        .catch((err) => {
          setErrors('No issues found - try searching a different number');
          console.log(err);
        });
    }
  };

  if (!issues.length || loading) {
    return <Spinner />;
  }
  return (
    <div className="container mt-3">
      <OpenIssues
        issues={issues}
        issuesList={issuesList}
        projectTitle={currentProject}
        listProjects={listProjects}
        onChange={onChange}
        sortNumber={sortNumber}
        sortWord={sortWord}
        sortDate={sortDate}
      />
      <ClosedIssues
        closed={closed}
        completedIssuesList={completedIssuesList}
        sortNumber={sortNumber}
        sortWord={sortWord}
        sortDate={sortDate}
      />
      <div className="form-group">
        <Link to={'/issues'} id="see-more-link">
          See All
        </Link>
      </div>
      <ShowAlert alert={error} />
      <HomeSearch onSubmit={onSubmit} onChangeNumber={onChangeNumber} />
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  issues: PropTypes.object.isRequired,
  getIssues: PropTypes.func.isRequired,
  getRecentClosed: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => ({
  issues: state.issues,
  user: state.auth.user,
  error: state.error.msg,
});

export default connect(mapStateToProps, {
  getIssues,
  getRecentClosed,
  setErrors,
  setProject,
})(Home);
