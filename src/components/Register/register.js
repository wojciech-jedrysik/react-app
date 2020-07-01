import React, { Component } from "react";
import "./register.scss";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authenticate, setUserInfo } from "../../actions/user-actions";
import Button from "@material-ui/core/Button";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      email: "",
      redirectLogin: false,
      formError: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    const email = this.state.email;
    const password = this.state.password;
    try {
      const response = await axios.post('https://ie2020.kisim.eu.org/api/users', {
        email,
        password
      });
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.setUserInfo(response.data);
      this.props.authenticate(true);
    } catch (err) {
      this.setState({
        formError: true
      });
    }
  };

  goToLogin = () => {
    this.setState({
      redirectLogin: true
    });
  };

  render() {
    if (this.state.redirectLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-form">
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            ></input>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            ></input>

            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Register
            </Button>
          </div>
          <span
            className="error"
            style={{ visibility: this.state.formError ? "visible" : "hidden" }}
          >
            Data not correct
          </span>
          <div className="goLogin" onClick={this.goToLogin}>Already registered</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate: value => dispatch(authenticate(value)),
    setUserInfo: value => dispatch(setUserInfo(value))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Register);
