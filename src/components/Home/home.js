import React, { Component } from 'react';
import { connect } from "react-redux";
import './home.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
  }

  render() {
    return (
      <div>
          <h4>List </h4>
          {this.state.schedules.map((schedule, index) => (
            <div key={index}>
              {schedule.id}: {schedule.name}
            </div>
          ))}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  };
};

export default connect(mapStateToProps)(Home);
