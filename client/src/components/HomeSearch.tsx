import React from 'react';
import './HomeSearch.css';
import Alert from './Alert';

interface HomeSearchProps {
onSubmit: () => void,
onChangeNumber: () => void,
alerts: {
  param: string
}[]
}

const HomeSearch = ({ onSubmit, onChangeNumber, alerts } : HomeSearchProps) => {
  const applyErrorStyle = (inputField: string) =>
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



export default HomeSearch;
