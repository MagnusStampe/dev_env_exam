import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./HeaderFrontpage.module.css";

export default class HeaderMain extends Component {
  state = {
  };

  render() {
    const image = "/images/ss_logo.png"
    return (
      <section className={styles.headerContainer}>
        <div className={styles.wrapper}>
          <div className={styles.logoContainer}>
            <Link to="/">
              <div className={styles.logo} style={{
                backgroundImage: `url("${image}")`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }}>
              </div></Link>
          </div>
          {
            !this.props.auth.loggedIn ? (
              <div className={styles.menuContainer}>
                <div className={styles.menuItem}>
                  <Link to="/login">Login</Link>
                </div>
                <div className={styles.menuItem}>
                  <Link to="/signup">Sign up</Link>
                </div>
              </div>
            ) : (
                <div className={styles.menuContainer}>
                  <div className={styles.menuItem}>
                    <Link to="/profile">Profile</Link>
                  </div>
                </div>
              )
          }
        </div >
      </section >
    );
  }
}
