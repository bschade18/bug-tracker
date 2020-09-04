import React, { useState } from 'react';
import './Landing.css';
import Alert from './Alert';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions/authActions';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';

const Landing = ({ isAuthenticated, alerts, login, clearErrors }) => {
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

  const applyErrorStyle = (inputField) =>
    alerts.filter((alert) => alert.param === inputField).length;

  if (isAuthenticated) {
    clearErrors();
    return <Redirect to="/home" />;
  }

  return (
    <div className="Landing">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit} id="login-form" noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={onChange}
            type="email"
            name="email"
            className={
              applyErrorStyle('email')
                ? 'login-input error-border'
                : 'login-input'
            }
          />
          <Alert field="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={onChange}
            type="password"
            name="password"
            className={
              applyErrorStyle('password')
                ? 'login-input error-border'
                : 'login-input'
            }
          />
          <Alert field="password" />
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
  error: PropTypes.array,
  clearErrors: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.error.errors,
});

export default connect(mapStateToProps, { login, clearErrors })(Landing);
