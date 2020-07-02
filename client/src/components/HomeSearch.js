import React from 'react';
import { Link } from 'react-router-dom';
const HomeSearch = ({ onSubmit, onChangeNumber }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Search Issue # </label>
          <input
            type="text"
            className="form-control"
            onChange={onChangeNumber}
            id="issue-search"
          />
        </div>

        <div className="form-group">
          <button
            type="submit"
            value="Search Issue"
            className="btn btn-primary"
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

export default HomeSearch;
