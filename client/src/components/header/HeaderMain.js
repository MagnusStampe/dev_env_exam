import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderMain.module.css";
import InputTag from "../forms/InputTag";


export default class HeaderMain extends Component {
  state = {
    destination: null,
    checkIn: null,
    checkOut: null,
    guests: null,
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  };

  onFormSubmit = e => {
    e.preventDefault()
    const { destination, checkIn, checkOut, guests } = this.state;
    console.log(this.state);
    this.props.handleTravelChanges(destination, checkIn, checkOut, guests);
    this.props.history.push("/search")
  }

  render() {
    const image = "/images/ss_logo.png"
    return (
      <section className={styles.mainContainer}>
        <div className={styles.wrapper}>
          <div className={styles.logoContainer}>
            <Link to="/"><div className={styles.logo} style={{
              backgroundImage: `url("${image}")`,
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat'
            }}>
            </div></Link>
          </div>
          <form className={styles.form} onSubmit={this.onFormSubmit}>
            <div className={styles.inputContainer}>
              <InputTag type="text" label="Destination" name="destination" onChange={this.handleInputChange} />
            </div>
            <div className={styles.inputContainer}>
              <InputTag
                type="date"
                label="Check in / check out"
                name="checkIn"
                name2="checkOut"
                onChange={this.handleInputChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <InputTag type="number" label="Guests" name="guests" onChange={this.handleInputChange} />
            </div>
            <button className={styles.submitButton}>Search</button>
          </form>
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
        </div>
      </section>
    );
  }
}
