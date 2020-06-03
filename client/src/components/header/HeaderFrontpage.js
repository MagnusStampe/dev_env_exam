import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./HeaderFrontpage.module.css";

export default class HeaderMain extends Component {
  state = {
    // destination: null,
    // checkIn: null,
    // checkOut: null,
    // guests: null,

    loggedIn: false
  };

  // onFormSubmit = e => {
  //   this.props.handleTravelInfoChange(this.state);
  //   e.preventDefault();
  // };

  render() {
    return (
      <section className={styles.headerContainer}>
        <div className={styles.wrapper}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <Link to="/">LOGO</Link>
            </div>
          </div>
          {!this.props.auth.loggedIn ? (
            <div className={styles.menuContainer}>
              <div className={styles.menuItem}>
                <Link to="/login">Login</Link>
              </div>
              <div className={styles.menuItem}>
                <Link to="/signup">Sign up</Link>
              </div>
            </div>
          ):(
            <div className={styles.menuContainer}>
              <div className={styles.menuItem}>
                <Link to="/profile">Profile</Link>
              </div>
            </div>
          )}
          </div>
      </section>
    );
  }
}
