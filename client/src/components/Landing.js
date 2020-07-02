import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions/authActions';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated, error, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        {error ? <Alert color="danger">{error}</Alert> : null}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input onChange={onChange} type="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={onChange} type="password" name="password" />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error.msg,
});

export default connect(mapStateToProps, { login })(Landing);
