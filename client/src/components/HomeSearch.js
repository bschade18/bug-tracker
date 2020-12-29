import React from 'react';
import './HomeSearch.css';
import Alert from './Alert';
import PropTypes from 'prop-types';

const HomeSearch = ({ onSubmit, onChangeNumber, alerts }) => {
  const applyErrorStyle = (inputField) =>
    alerts.filter((alert) => alert.param === inputField).length;

  return (
    <form onSubmit={onSubmit} className="HomeSearch">
      <div className="form-group">
        <label className="bold-text" htmlFor="issue-search">
          Search Issue #{' '}
        </label>
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
        <Alert field="search" />
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
