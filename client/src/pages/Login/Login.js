import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";
import InputTag from "../../components/forms/InputTag";

export default class Login extends Component {
  render() {
    return (
      <main className={styles.mainContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Login</h1>
          <div className={styles.formContainer}>
            <form className={styles.form} method="POST">
              <InputTag type="text" label="Username" name="username" />
              <InputTag type="text" label="Password" name="password" />
              <button className={styles.submitButton}>Login</button>
            </form>
          </div>
          <div className={styles.signUpContainer}>
            <Link className={styles.signUpLink} to="/signup">
              Sign up?
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
