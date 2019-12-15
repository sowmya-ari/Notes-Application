import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../styles/Registration.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      retype_password: "",
      result: {}
    };
  }

  HandleSubmit = event => {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      retype_password: this.state.retype_password
    };
    this.setState({ result: {} });
    axios
      .post(
        "http://notes-alb-1339370148.us-east-1.elb.amazonaws.com:8000/register",
        data
      )
      .then(res => {
        if (res.data.status === 201) {
          this.setState({ result: res.data });
          return this.props.history.push("/");
        } else {
          this.setState({ result: res.data });
        }
      })
      .catch(err => console.log(err));
    this.setState({
      username: "",
      password: "",
      retype_password: ""
    });
  };

  HandleUsernameChange = event => {
    this.setState({
      username: event.target.value
    });
  };

  HandlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  HandleRetypePasswordChange = event => {
    this.setState({
      retype_password: event.target.value
    });
  };

  render() {
    return (
      <div className="register">
        <div>
          {this.state.result.status !== 201 && (
            <h2>{this.state.result.message}</h2>
          )}
        </div>
        <Form onSubmit={this.HandleSubmit}>
          <Form.Group controlId="Username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              placeholder="Enter username"
              type="username"
              value={this.state.username}
              onChange={this.HandleUsernameChange}
            />
          </Form.Group>
          <Form.Group controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.HandlePasswordChange}
              type="password"
            />
          </Form.Group>
          <Form.Group controlId="RetypePassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              placeholder="Confirm password"
              value={this.state.retype_password}
              onChange={this.HandleRetypePasswordChange}
              type="password"
            />
          </Form.Group>
          <Button block type="submit">
            Register
          </Button>
        </Form>
      </div>
    );
  }
}
export default Register;
