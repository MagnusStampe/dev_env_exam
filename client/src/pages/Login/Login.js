import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// Component
import InputTag from "../../components/forms/InputTag";

// Styles
import styles from "./Login.module.css";

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit = async event => {
    const {
      email,
      password
    } = this.state

    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: email, 
          password: password,
      }),
      credentials: 'include'
    }

    await fetch('http://localhost:8080/users/login', options)
      .then(res => res.json())
      .then(res => {
        if(res.status !== 1) return
        this.props.updateAuth()
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <main className={styles.mainContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Login</h1>
          <div className={styles.formContainer}>
            <form onSubmit={this.handleSubmit} className={styles.form}>
              <InputTag
                type="email"
                value={this.state.email}
                onChange={event => this.setState({email: event.target.value})}
                label="E-mail"
                name="email"
              />
              <InputTag
                type="password"
                value={this.state.password}
                onChange={event => this.setState({password: event.target.value})}
                label="Password"
                name="password"
              />
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

export default withRouter(Login)
