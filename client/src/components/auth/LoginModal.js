import React, { Component } from "react";
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
  Alert
} from "reactstrap";
import axios from "axios";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: "",
      password: "",
      msg: null
    };
  }

  componentDidUpdate() {
    if (this.state.modal) {
      if (this.props.isAuthenticated) {
        this.toggle();
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    this.login(user);
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  returnErrors = (data, status) => {
    this.setState({
      msg: data.msg
    });
  };

  login = user => {
    const { email, password } = user;

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    // request body
    const body = JSON.stringify({ email, password });

    axios
      .post("/auth/login", body, config)
      .then(res => this.loginSuccess(res.data))
      .catch(err => this.returnErrors(err.response.data, err.response.status));
  };

  loginSuccess = data => {
    localStorage.setItem("token", data.token);
    this.props.authSuccess(data.user);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Log in
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
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
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
