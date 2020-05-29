import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./Signup.module.css";
import InputTag from "../../components/forms/InputTag";

export default class Signup extends Component {
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
                    <div className={styles.subTitle}>First container</div>
                    <InputTag type="text" label="Username" name="username" />
                    <InputTag type="text" label="Password" name="password" />
                    <InputTag type="email" label="E-mail" name="email" />
                    <InputTag
                      type="text"
                      label="Repeat password"
                      name="repeatPassword"
                    />
                    <InputTag
                      type="number"
                      label="Phone number"
                      name="phonenumber"
                    />
                    <InputTag type="text" label="Phone code" name="phoneCode" />
                    <InputTag
                      type="text"
                      label="Country code"
                      name="countryCode"
                    />
                  </div>
                </div>

                <div className={styles.wrapperContainer}>
                  <div className={styles.inputContainer}>
                    <div className={styles.subTitle}>Creditcard</div>
                    <InputTag type="number" label="IBAN code" name="ibanCode" />
                    <InputTag type="number" label="CVV" name="cvv" />
                    <InputTag type="text" label="Exp Date" name="expDate" />
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
