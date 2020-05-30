import React, { Component } from "react";

import styles from "./Signup.module.css";
import InputTag from "../../components/forms/InputTag";

export default class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    phoneCode: "",
    countryCode: "",
    ibanCode: "",
    cvv: "",
    expDate: "",
    userType: "guest"
  };
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.user);
  };

  onFormSubmit = async event => {
    event.preventDefault();
    const {
      username,
      email,
      password,
      phoneNumber,
      phoneCode,
      countryCode,
      ibanCode,
      cvv,
      expDate,
      userType
    } = this.state;

    console.log(this.state);

    await fetch("http://localhost:8080/users/create", {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        phoneCode: phoneCode,
        countryCode: countryCode,
        IBAN: ibanCode,
        CVV: cvv,
        expirationDate: expDate,
        userType: userType
      })
    })
      .then(res => {
        res.json();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <main className={styles.mainContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Sign up</h1>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={this.onFormSubmit}>
              <div className={styles.wrapper}>
                <div className={styles.wrapperContainer}>
                  <div className={styles.inputContainer}>
                    <div className={styles.subTitle}>
                      <h3>Info</h3>
                    </div>
                    <InputTag
                      type="text"
                      label="Username"
                      name="username"
                      onChange={this.handleInputChange}
                    />
                    <InputTag
                      type="email"
                      label="E-mail"
                      name="email"
                      onChange={this.handleInputChange}
                    />
                    <InputTag
                      type="password"
                      label="Password"
                      name="password"
                      onChange={this.handleInputChange}
                    />
                    <InputTag
                      type="text"
                      label="Repeat password"
                      name="repeatPassword"
                    />
                    <InputTag
                      type="text"
                      label="Phone number"
                      name="phoneNumber"
                      onChange={this.handleInputChange}
                    />
                    <InputTag
                      type="text"
                      label="Phone code"
                      name="phoneCode"
                      onChange={this.handleInputChange}
                    />
                    <InputTag
                      type="text"
                      label="Country code"
                      name="countryCode"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.wrapperContainer}>
                  <div className={styles.inputContainer}>
                    <div className={styles.subTitle}>
                      <h3>Creditcard</h3>
                    </div>
                    <InputTag
                      type="number"
                      label="IBAN code"
                      name="ibanCode"
                      onChange={this.handleInputChange}
                    />
                    <InputTag
                      type="number"
                      label="CVV"
                      name="cvv"
                      onChange={this.handleInputChange}
                    />
                    <InputTag
                      type="text"
                      label="Exp Date"
                      name="expDate"
                      onChange={this.handleInputChange}
                    />
                    <select
                      className={styles.selectUserContainer}
                      name="userType"
                      onChange={this.handleInputChange}
                    >
                      <option value="guest">Guest</option>
                      <option value="property_owner">Property owner</option>
                    </select>
                    <div className={styles.submitContainer}>
                      <button className={styles.submitButton}>Signup</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}
