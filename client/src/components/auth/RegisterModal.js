import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
} from 'reactstrap';
import { register } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';
import { setErrors, clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RegisterModal = ({ isAuthenticated, register, clearErrors, alerts }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    team: '',
    password: '',
    password2: '',
  });
  const [modal, setModal] = useState(false);

  const { name, email, team, password, password2 } = formData;

  const toggle = () => {
    clearErrors();
    clearFormState();
    setModal(!modal);
  };

  const clearFormState = () => {
    setFormData({ name: '', email: '', team: '', password: '', password2: '' });
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    register({ name, email, team, password, password2 });
  };

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

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Account <span className="text-primary">Register</span>
        </ModalHeader>
        <ModalBody>
          <Form id="register-form" onSubmit={onSubmit} noValidate>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={onChange}
                className={
                  applyErrorStyle('name') ? 'mb-3 error-border' : 'mb-3'
                }
              />

              {checkAlert('name')}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
                className={
                  applyErrorStyle('email') ? 'mb-3 error-border' : 'mb-3'
                }
              />

              {checkAlert('email')}
            </FormGroup>
            <FormGroup>
              <Label for="team">Team</Label>
              <Input
                type="text"
                name="team"
                id="team"
                placeholder="Team"
                onChange={onChange}
                className={
                  applyErrorStyle('team') ? 'mb-3 error-border' : 'mb-3'
                }
              />
              {checkAlert('team')}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
                className={
                  applyErrorStyle('password') ? 'mb-3 error-border' : 'mb-3'
                }
              />
              {checkAlert('password')}
            </FormGroup>
            <FormGroup>
              <Label for="password2"> Confirm Password</Label>
              <Input
                type="password"
                name="password2"
                id="password2"
                placeholder="Confirm Password"
                onChange={onChange}
                className={
                  applyErrorStyle('password2') ? 'mb-3 error-border' : 'mb-3'
                }
              />
              {checkAlert('password2')}
            </FormGroup>
            <Button color="primary" block>
              Register
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  register: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  error: PropTypes.array,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.error.errors,
});

export default connect(mapStateToProps, {
  register,
  setErrors,
  clearErrors,
})(RegisterModal);
