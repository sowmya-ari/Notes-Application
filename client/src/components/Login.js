import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../styles/Login.css";
const jwt = require("jsonwebtoken");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      result: {}
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("Token");
    const decodedToken = jwt.decode(token);
    const dateNow = new Date();
    if (token) {
      if (decodedToken.exp < dateNow.getTime()) {
        this.props.history.push("/notes");
      }
    } else {
      return this.props.history.push("/");
    }
  }

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

  HandleSubmit = event => {
    event.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post("/login", data).then(res => {
      this.setState({ result: res.data });
      if (res.data.status === 201) {
        const token = res.data.token;
        const id = res.data.id;
        localStorage.setItem("Token", token);
        localStorage.setItem("user_id", id);
        window.location.reload();
      }
    });
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <div className="login">
        <div>
          {this.state.result.status !== 201 && (
            <h2>{this.state.result.message}</h2>
          )}
        </div>
        <Form onSubmit={this.HandleSubmit}>
          <Form.Group controlId="Username">
            <Form.Label>Username</Form.Label>
            <Form.Control
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
          <Button block type="submit">
            Log In
          </Button>
        </Form>
      </div>
    );
  }
}
export default Login;
