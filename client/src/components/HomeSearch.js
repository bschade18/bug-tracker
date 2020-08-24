import React from 'react';
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
    <form onSubmit={onSubmit} id="homeSearch-form">
      <div className="form-group">
        <label>Search Issue # </label>
        <div className="search-container">
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
          <button>
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        {checkAlert('search')}
      </div>
    </form>
  );
};

HomeSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChangeNumber: PropTypes.func.isRequired,
  alerts: PropTypes.array,
};

export default HomeSearch;
