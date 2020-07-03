import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchForm = ({
  onSubmit,
  onChange,
  initiatedStartDt,
  onChangeDateInitStart,
  initiatedEndDt,
  onChangeDateInitEnd,
}) => {
  return (
    <div>
      <h5>Advanced Search</h5>

      <form>
        <div className="form-group">
          <input
            placeholder="Assigned To"
            type="text"
            name="assignedTo"
            className="form-control mt-3"
            onChange={onChange}
            id="assigned-to-search"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Initiated By"
            type="text"
            name="initiatedBy"
            className="form-control mt-4"
            onChange={onChange}
            id="initiated-by-search"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Status"
            type="text"
            name="status"
            className="form-control mt-4"
            onChange={onChange}
            id="status"
          />
        </div>
        <div className="form-group">
          <DatePicker
            name="initiatedStartDt"
            selected={initiatedStartDt}
            onChange={onChangeDateInitStart}
            id="init-start-dt"
            className="mt-1 form-control"
            placeholderText="Date Initiated - Start"
          />
        </div>
        <div className="form-group">
          <DatePicker
            name="initiatedEndDt"
            selected={initiatedEndDt}
            onChange={onChangeDateInitEnd}
            id="init-end-dt"
            className="mt-1 form-control"
            placeholderText="Date Initiated - End"
          />
        </div>
        <div className="form-group">
          <button
            onClick={onSubmit}
            value="Search"
            className="btn btn-primary mt-3"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
