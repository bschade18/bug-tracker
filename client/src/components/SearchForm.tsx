import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SearchFormProps {
  onSubmit: () => void,
  onChange: () => void,
  onChangeDateInitStart: () => void,
  onChangeDateInitEnd: () => void
  initiatedStartDt: Date,
  initiatedEndDt: Date,
  
}

const SearchForm = ({
  onSubmit,
  onChange,
  initiatedStartDt,
  onChangeDateInitStart,
  initiatedEndDt,
  onChangeDateInitEnd,
} : SearchFormProps ) => {
  return (
    <div>
      <h5 className="lg-heading">Advanced Search</h5>

      <form>
        <div className="form-group">
          <input
            placeholder="Assigned To"
            type="text"
            name="assignedTo"
            className="form-control form-input mt-3"
            onChange={onChange}
            id="assigned-to-search"
            aria-label="Assigned To"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Initiated By"
            type="text"
            name="initiatedBy"
            className="form-control form-input mt-4"
            onChange={onChange}
            id="initiated-by-search"
            aria-label="Initiated By"
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Status"
            type="text"
            name="status"
            className="form-control form-input mt-4"
            onChange={onChange}
            id="status"
            aria-label="Status"
          />
        </div>
        <div className="form-group">
          <DatePicker
            name="initiatedStartDt"
            selected={initiatedStartDt}
            onChange={onChangeDateInitStart}
            id="init-start-dt"
            className="mt-1 form-input form-control"
            placeholderText="Date Initiated - Start"
            aria-label="Date Initiated - Start"
          />
        </div>
        <div className="form-group">
          <DatePicker
            name="initiatedEndDt"
            selected={initiatedEndDt}
            onChange={onChangeDateInitEnd}
            id="init-end-dt"
            className="mt-1 form-input form-control"
            placeholderText="Date Initiated - End"
            aria-label="Date Initiated - End"
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
