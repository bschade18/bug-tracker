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
  Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { loadUser, register } from '../../actions/authActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setErrors, clearErrors } from '../../actions/errorActions';

const RegisterModal = ({
  isAuthenticated,
  register,
  error,
  setErrors,
  clearErrors,
}) => {
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
    setModal(!modal);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setErrors('passwords do not match');
    } else {
      register({ name, email, team, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/main" />;
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
          {error ? <Alert color="danger">{error}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={onChange}
                className="mb-3"
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
                className="mb-3"
              />

              <Label for="email">Team</Label>
              <Input
                type="text"
                name="team"
                id="team"
                placeholder="Team"
                onChange={onChange}
                className="mb-3"
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
                className="mb-3"
              />

              <Label for="password"> Confirm Password</Label>
              <Input
                type="password"
                name="password2"
                id="password2"
                placeholder="Confirm Password"
                onChange={onChange}
                className="mb-3"
              />
              <Button color="primary" style={{ marginTop: '2rem' }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  loadUser: PropTypes.func.isRequired,
  register: PropTypes.func,
  error: PropTypes.string,
  setErrors: PropTypes.func,
  clearErrors: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error.msg,
});

export default connect(mapStateToProps, {
  loadUser,
  register,
  setErrors,
  clearErrors,
})(RegisterModal);
