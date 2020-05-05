import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const LoginModal = ({ isAuthenticated, login, error, clearErrors }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [modal, setModal] = useState(false);
  // const [msg, setMsg] = useState(null);

  const { email, password } = formData;

  const toggle = () => {
    clearErrors();
    setModal(!modal);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/main" />;
  }

  return (
    <Fragment>
      <NavLink onClick={toggle} href="#">
        Log in
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {error ? <Alert color="danger">{error}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={onChange}
                className="mb-3"
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={onChange}
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
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
  error: PropTypes.string,
  clearErrors: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error.msg,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
