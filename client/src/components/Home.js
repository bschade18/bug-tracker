import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Issue from './Issue';
import Spinner from './layout/Spinner';
import PropTypes from 'prop-types';
import OpenIssues from './OpenIssues';
import ClosedIssues from './ClosedIssues';
import HomeSearch from './HomeSearch';

import {
  getIssues,
  getRecentClosed,
  setProject,
} from '../actions/issueActions';
import { setErrors, clearErrors } from '../actions/errorActions';

const Home = ({
  user: { team, name },
  getIssues,
  issues: { issues, closed, loading, currentProject },
  getRecentClosed,
  setErrors,
  error,
  setProject,
  history,
  alerts,
  clearErrors,
}) => {
  const [number, setNumber] = useState('');
  const [sortColumn, setSortColumn] = useState(false);

  useEffect(() => {
    getIssues(team);
    getRecentClosed(team);
    clearErrors();
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
      setErrors([{ msg: 'Enter an issue number to search', param: 'search' }]);
    } else if (number.length !== 6 || !/^\d+$/.test(number)) {
      setErrors([{ msg: 'Enter a valid 6 digit number', param: 'search' }]);
    } else {
      axios
        .get(`issues?&number=${number}&select=_id`)
        .then((res) => history.push(`issue/${res.data.data[0]._id}`))
        .catch((err) => {
          setErrors([
            {
              msg: 'No issues found - try searching a different number',
              param: 'search',
            },
          ]);
          console.log(err);
        });
    }
  };

  if (loading) {
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
      <HomeSearch
        onSubmit={onSubmit}
        onChangeNumber={onChangeNumber}
        alerts={alerts}
      />
      <div>
        <Link to={'/search'} id="advanced-search-link" className="mb-2">
          Advanced Search
        </Link>
      </div>

      <div>
        <Link to={'/issues'} id="see-more-link" className="mb-5">
          See All Issues
        </Link>
      </div>
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  issues: PropTypes.object.isRequired,
  getIssues: PropTypes.func.isRequired,
  getRecentClosed: PropTypes.func.isRequired,
  error: PropTypes.string,
  clearErrors: PropTypes.func,
};

const mapStateToProps = (state) => ({
  issues: state.issues,
  user: state.auth.user,
  error: state.error.msg,
  alerts: state.error.errors,
});

export default connect(mapStateToProps, {
  getIssues,
  getRecentClosed,
  setErrors,
  setProject,
  clearErrors,
})(Home);
