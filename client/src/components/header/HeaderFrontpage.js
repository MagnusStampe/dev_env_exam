import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HeaderMain extends Component {
  state = {
    destination: null,
    checkIn: null,
    checkOut: null,
    guests: null
  };

  render() {
    console.log("save and test: " + this.state.destination);
    console.log(this.props);
    return (
      <div>
        <div className="navContainerFrontpage">
          <div className="flexWrapper">
            <div className="logoContainer">
              <div className="logo">ddddddd</div>
            </div>
            <div className="menuContainer">
              <div className="help">Help</div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
