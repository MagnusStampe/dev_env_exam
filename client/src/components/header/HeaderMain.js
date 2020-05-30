import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderMain.module.css";
import InputTag from "../forms/InputTag";

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
      <section className={styles.mainContainer}>
        <div className={styles.wrapper}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <Link to="/">LOGO</Link>
            </div>
          </div>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <div className={styles.inputContainer}>
                <InputTag type="text" label="Destination" name="destTxt" />
              </div>
              <div className={styles.inputContainer}>
                <InputTag
                  type="date"
                  label="Check in / check out"
                  name="checkInOutTxt1"
                  name2="checkInOutTxt2"
                />
              </div>
              <div className={styles.inputContainer}>
                <InputTag type="number" label="Guests" name="guestsTxt" />
              </div>
              <div className={styles.submitContainer}>
                <button className={styles.submitButton}>Search</button>
              </div>
            </form>
          </div>
          <div className={styles.menuContainer}>
            <div className={styles.menuItem}>
              <Link to="/login">Login</Link>
            </div>
            <div className={styles.menuItem}>
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
