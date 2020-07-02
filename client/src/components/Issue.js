import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Issue = ({
  issue: { createdAt, number, status, issueTitle, assignedTo, _id },
}) => {
  const day = createdAt.substring(8, 10).padStart(2, '0');
  const month = createdAt.substring(6, 7).padStart(2, '0');
  const year = createdAt.substring(0, 4);
  const date = month + '/' + day + '/' + year;
  return (
    <tr>
      <td>{number}</td>
      <td>{status}</td>
      <td id="title">{issueTitle}</td>
      <td>{assignedTo}</td>
      <td>{date}</td>
      <td className="folder-container">
        <Link className="folder" to={'/issue/' + _id}>
          <i className="icon-folder-open-alt"></i>
        </Link>
      </td>
    </tr>
  );
};

Issue.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default Issue;
