import React, { Component } from 'react';
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

class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      name: '',
      email: '',
      password: '',
      msg: null,
    };
  }
  static propTypes = {
    authSuccess: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentDidUpdate() {
    if (this.state.modal && this.props.isAuthenticated) {
      this.toggle();
    }
  }

  toggle = () => {
    this.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };

  clearErrors = () => {
    this.setState({
      msg: null,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;

    const newUser = {
      name,
      email,
      password,
    };

    this.register(newUser);
  };

  register = (newUser) => {
    const { name, email, password } = newUser;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    axios
      .post('/auth/register', body, config)
      .then((res) => this.registerSuccess(res.data))
      .catch((err) => this.returnErrors(err.response.data));
  };

  registerSuccess = (data) => {
    localStorage.setItem('token', data.token);
    this.props.authSuccess(data.user);
  };

  returnErrors = (data) => {
    this.setState({
      msg: data.msg,
    });
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onChange}
                  className="mb-3"
                />

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.onChange}
                  className="mb-3"
                />

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
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
  }
}

export default RegisterModal;
