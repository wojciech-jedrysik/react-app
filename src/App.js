import React, { Component, Fragment } from 'react';
import './App.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import PrivateRoute from './routeGuards/PrivateRoute';
import LoginRoute from './routeGuards/LoginRoute';
import BasicRoute from './routeGuards/BasicRoute';
import Login from './components/Login/login';
import Home from './components/Home/home';
import Sessions from './components/Sessions';
import MyReminders from './components/Reminders';
import Navbar from './container/Navbar/Navbar';
import Register from './components/Register/register';
import { authenticate, setUserInfo, isAdmin } from './actions/user-actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileLoaded: false
    };
  }
  async componentDidMount() {
    this.setState({
      profileLoaded: true
    })
  }

  render() {
    return (
      this.state.profileLoaded ?
          <div className="app-container">
          <Navbar />
          <div className="components-container">
            <LoginRoute path="/login" component={Login} authed={this.props.authenticated} />
            <LoginRoute path="/register" component={Register} authed={this.props.authenticated} />
            <PrivateRoute path="/" exact component={Home} authed={this.props.authenticated} />
            <BasicRoute path="/sessions" exact component={Sessions} authed={this.props.authenticated} />
            <PrivateRoute path="/reminders" exact component={MyReminders} authed={this.props.authenticated} />
          </div>
          </div>
        :
        null
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: value => dispatch(authenticate(value)),
    setUserInfo: value => dispatch(setUserInfo(value)),
    isAdmin: value => dispatch(isAdmin(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
