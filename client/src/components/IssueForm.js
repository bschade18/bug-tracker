import React, { Fragment } from 'react';

const IssueForm = ({
  number,
  issueTitle,
  name,
  issueDescription,
  onChange,
  assignedTo,
  users,
  status,
  today,
  projectTitle,
  onSubmit,
}) => {
  return (
    <Fragment>
      <h3>Issue #{number}</h3>
      <h5 style={{ textAlign: 'center' }}>{issueTitle}</h5>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Project: </label>
          <p>{projectTitle}</p>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <textarea
            type="text"
            required
            className="form-control description-input"
            name="issueDescription"
            value={issueDescription}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Assign To: </label>
          <select
            required
            className="form-control"
            name="assignedTo"
            value={assignedTo}
            onChange={onChange}
            id="assign-to"
          >
            {users.map((user, i) => (
              <option key={i} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            required
            className="form-control"
            name="status"
            value={status}
            onChange={onChange}
            id="status-input"
          >
            <option>Open</option>
            <option>Urgent</option>
            <option>Closed</option>
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
    </Fragment>
  );
};

export default IssueForm;
