import React, { Component } from "react";

// Styles
import styles from "./Profile.module.css";

export default class Profile extends Component {
  render() {
    const user = {
      username: "Elias Marco Lip",
      email: "eli@test.dk",
      password: "********",
      phoneNumber: "88888888",
      phoneCode: "45",
      countryCode: "3455",
      ibanCode: "1231 4322 5423 2311",
      expDate: "12/23",
      cvv: "522"
    };
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
                  <div className={styles.wrapperTitle}>
                    <h2>User information:</h2>
                  </div>
                  <div>
                    <p>
                      Username: {user.username}
                    </p>
                  </div>
                  <div>
                    <p>
                      E-mail: {user.email}
                    </p>
                  </div>
                  <div>
                    <p>
                      Password: {user.password}
                    </p>
                  </div>
                  <div>
                    <p>
                      Phone number: +({user.phoneCode}) {user.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <p>
                      Country code: {user.countryCode}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.wrapperContainer}>
                <div className={styles.wrapperContent}>
                  <div className={styles.wrapperTitle}>
                    <h2>Creditcard:</h2>
                  </div>
                  <div>
                    <p>
                      IBAN code: {user.ibanCode}
                    </p>
                  </div>
                  <div>
                    <p>Change card</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
