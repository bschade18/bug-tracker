import React from "react";
import { Link } from "react-router-dom";

function Issue(props) {
  const createdDate = props.issue.createdAt;
  const day = createdDate.substring(8, 10).padStart(2, "0");
  const month = createdDate.substring(6, 7).padStart(2, "0");
  const year = createdDate.substring(0, 4);
  const date = month + "/" + day + "/" + year;
  return (
    <tr>
      <td>{props.issue.number}</td>
      <td>{props.issue.status}</td>
      <td id="title">{props.issue.issueTitle}</td>
      <td>{props.issue.assignedTo}</td>
      <td>{date}</td>
      <td className="folder-container">
        <Link className="folder" to={"/review/" + props.issue._id}>
          <i className="icon-folder-open-alt"></i>
        </Link>
      </td>
    </tr>
  );
}

export default Issue;
