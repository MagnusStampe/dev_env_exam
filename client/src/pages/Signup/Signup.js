import React, { Component } from "react";

import styles from "./Signup.module.css";
import InputTag from "../../components/forms/InputTag";

export default class Signup extends Component {
  state = {
    user: {
      username: "",
      password: "",
      phoneNumber: "",
      countryCode: "",
      ibanCode: "",
      cvv: "",
      expDate: "",
      userType: ""
    }
  };
  handleInputChange = event => {
    this.setState({
      user: { [event.target.name]: event.target.value }
    });
    console.log(this.state.user.username);
  };

  render() {
    return (
      <main className={styles.mainContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Sign up</h1>
          <div className={styles.formContainer}>
            <form className={styles.form} method="POST">
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
                      type="text"
                      label="Password"
                      name="password"
                      onChange={this.handleInputChange}
                    />
                    <InputTag
                      type="text"
                      label="Repeat password"
                      name="repeatPassword"
                      onChange={this.handleInputChange}
                    />
                    <InputTag
                      type="text"
                      label="Phone number"
                      name="phoneNumber"
                      onChange={this.handleInputChange}
                    />
                    <InputTag type="text" label="Phone code" name="phoneCode" />
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
