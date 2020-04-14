import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Issue = ({
  issue: { createdAt, number, status, issueTitle, assignedTo, _id },
}) => {
  const createdDate = createdAt;
  const day = createdDate.substring(8, 10).padStart(2, '0');
  const month = createdDate.substring(6, 7).padStart(2, '0');
  const year = createdDate.substring(0, 4);
  const date = month + '/' + day + '/' + year;
  return (
    <tr>
      <td>{number}</td>
      <td>{status}</td>
      <td id="title">{issueTitle}</td>
      <td>{assignedTo}</td>
      <td>{date}</td>
      <td className="folder-container">
        <Link className="folder" to={'/review/' + _id}>
          <i className="icon-folder-open-alt"></i>
        </Link>
      </td>
    </tr>
  );
};

Issue.propTypes = {
  createdAt: PropTypes.instanceOf(Date),
  number: PropTypes.number,
  status: PropTypes.string,
  issueTitle: PropTypes.string,
  assignedTo: PropTypes.string,
  _id: PropTypes.string,
};

export default Issue;
