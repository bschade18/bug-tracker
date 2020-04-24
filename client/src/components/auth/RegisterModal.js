import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import PropTypes from 'prop-types';

const RegisterModal = ({ isAuthenticated, authSuccess }) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (modal && isAuthenticated) {
      toggle();
    }
  });

  const toggle = () => {
    clearErrors();
    setModal(!modal);
  };

  const clearErrors = () => {
    setMsg(null);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    register(newUser);
  };

  const register = (newUser) => {
    const { name, email, password } = newUser;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    axios
      .post('/auth/register', body, config)
      .then((res) => registerSuccess(res.data))
      .catch((err) => returnErrors(err.response.data));
  };

  const registerSuccess = (data) => {
    localStorage.setItem('token', data.token);
    authSuccess(data.user);
  };

  const returnErrors = (data) => {
    setMsg(data.msg);
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={onChangeName}
                className="mb-3"
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChangeEmail}
                className="mb-3"
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChangePassword}
                className="mb-3"
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
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
  authSuccess: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default RegisterModal;
