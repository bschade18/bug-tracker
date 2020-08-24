import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomeSearch = ({ onSubmit, onChangeNumber, alerts }) => {
  const checkAlert = (inputField) => {
    if (alerts.filter((alert) => alert.param === inputField).length) {
      const msg = alerts.filter((alert) => alert.param === inputField)[0].msg;
      return (
        <p className="error">
          <strong>{msg}</strong>
        </p>
      );
    }
  };

  const applyErrorStyle = (inputField) =>
    alerts.filter((alert) => alert.param === inputField).length;

  return (
    <div>
      <form onSubmit={onSubmit} id="homeSearch-form">
        <div className="form-group">
          <label>Search Issue # </label>
          <input
            type="text"
            className={
              applyErrorStyle('search')
                ? 'form-control error-border'
                : 'form-control'
            }
            onChange={onChangeNumber}
            id="issue-search"
          />
          {checkAlert('search')}
        </div>

        <div className="form-group">
          <button
            type="submit"
            value="Search Issue"
            className="btn btn-primary mt-1"
          >
            Search
          </button>
        </div>
      </form>
      <div className="form-group mb-4">
        <Link to={'/search'} id="advanced-search-link">
          Advanced Search
        </Link>
      </div>
    </div>
  );
};

HomeSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChangeNumber: PropTypes.func.isRequired,
  alerts: PropTypes.array,
};

export default HomeSearch;
