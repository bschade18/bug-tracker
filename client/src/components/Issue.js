import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Issue = ({
  issue: { createdAt, number, status, issueTitle, assignedTo, _id },
}) => {
  const day = createdAt.substring(8, 10).padStart(2, '0');
  const month = createdAt.substring(5, 7).padStart(2, '0');
  const year = createdAt.substring(0, 4);
  const date = month + '/' + day + '/' + year;
  return (
    <tr className="Issue">
      <td>{number}</td>
      <td>{status}</td>
      <td className="Issue-title">{issueTitle}</td>
      <td>{assignedTo}</td>
      <td>{date}</td>
      <td className="folder-container">
        <Link className="folder" to={'/issue/' + _id}>
          <i className="icon-folder-open-alt link"></i>
        </Link>
      </td>
    </tr>
  );
};

Issue.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default Issue;
