import React, { Component } from "react";

// Components
import ProfileProperties from './../../components/ProfileProperties/ProfileProperties';

// Styles
import styles from "./Profile.module.css";

export default class Profile extends Component {
  state = {
    user: {}
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = async () => {
    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
    if(!this.props.auth.loggedIn) return;
    await fetch(`http://localhost:8080/${this.props.auth.user.userType === 'propertyOwner' ? 'property-owners' : 'users'}/information`,options)
      .then(res => res.json())
      .then(res => {
        if(res.status !== 1) return;
        this.setState({user: res.user})
      })
      .catch(err => console.log(err))
  }

  render() {
    const {
      props: {
        auth
      },
      state: {
        user
      }
    } = this;
    
    if(!user || !auth.user) return null

    return (
      <main>
        <div className={styles.mainContainer}>
          <div className={styles.container}>
            <h1 className={styles.title}>Profile</h1>
            <div className={styles.userTitle}>
              {user.username}
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <div className={styles.wrapperContainer}>
                <div className={styles.wrapperContent}>
                  <h2 className={styles.title}>User information:</h2>
                  <p>Username: {user.username}</p>
                  <p>E-mail: {user.email}</p>
                  <p>Phone number: +({user.phoneCode}) {user.phoneNumber}</p>
                  <p>Country code: {user.countryCode}</p>
                </div>
              </div>

              <div className={styles.wrapperContainer}>
                <div className={styles.wrapperContent}>
                    <h2 className={styles.title}>Creditcard:</h2>
                    <p>IBAN code: {user.IBAN}</p>
                    <p>Change card</p>
                </div>
              </div>
            </div>
            {auth.user.userType === 'propertyOwner' ? (
            <div className={styles.container}>
              <ProfileProperties properties={user.properties} updateProperties={this.getUser} />
            </div>
            ) : null}
          </div>
        </div>
      </main>
    );
  }
}
