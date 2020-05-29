import React, { Component } from "react";

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
        <div className="flexWrapper">
          <div className="logoContainer">
            <div className="logo">ddddddd</div>
          </div>
          <div className="formContainer">
            <form
              onSubmit={() => this.props.handleTravelInfoChange(this.state)}
            >
              <input
                type="text"
                className="destination"
                onChange={event =>
                  this.setState({ destination: event.target.value })}
              />
              <input
                type="date"
                className="checkIn"
                onChange={event =>
                  this.setState({ checkIn: event.target.value })}
              />
              <input
                type="date"
                className="checkOut"
                onChange={event =>
                  this.setState({ checkOut: event.target.value })}
              />
              <input
                type="number"
                className="guests"
                onChange={event =>
                  this.setState({ guests: event.target.value })}
              />
              <button>Submit</button>
            </form>
          </div>
          <div className="menuContainer">
            <div className="help">Help</div>
            <div className="login">Login</div>
            <div className="signUp">Sign up</div>
          </div>
        </div>
      </div>
    );
  }
}
