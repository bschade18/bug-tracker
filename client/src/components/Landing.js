import React from 'react';
import './Landing.css';
import Alert from './Alert';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions/authActions';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';
import useFormState from './hooks/useFormState';

const Landing = ({ isAuthenticated, alerts, login, clearErrors }) => {
  const [email, setEmail] = useFormState('');
  const [password, setPassword] = useFormState('');

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
          <label htmlFor="landing-email">Email</label>
          <input
            id="landing-email"
            onChange={setEmail}
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
          <label htmlFor="landing-password">Password</label>
          <input
            id="landing-password"
            onChange={setPassword}
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
  alerts: PropTypes.array,
  clearErrors: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.error.errors,
});

export default connect(mapStateToProps, { login, clearErrors })(Landing);
