import React, { useState, useEffect, Fragment } from 'react';
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

const LoginModal = ({ isAuthenticated, authSuccess }) => {
  const [modal, setModal] = useState(false);
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

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    login(user);
  };

  const login = (user) => {
    const { email, password } = user;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    axios
      .post('/auth/login', body, config)
      .then((res) => loginSuccess(res.data))
      .catch((err) => returnErrors(err.response.data));
  };

  const loginSuccess = (data) => {
    localStorage.setItem('token', data.token);
    authSuccess(data.user);
  };

  const returnErrors = (data) => {
    setMsg(data.msg);
  };

  return (
    <Fragment>
      <NavLink onClick={toggle} href="#">
        Log in
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={onChangeEmail}
                className="mb-3"
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={onChangePassword}
                className="mb-3"
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

LoginModal.propTypes = {
  authSuccess: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default LoginModal;
