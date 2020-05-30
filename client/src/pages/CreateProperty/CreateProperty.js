import React, { Component } from "react";

import styles from "./CreateProperty.module.css";
import InputTag from "../../components/forms/InputTag";

export default class CreateProperty extends Component {
  render() {
    return (
      <main className={styles.mainContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Create Property</h1>
          <div className={styles.formContainer}>
            <form className={styles.form} method="POST">
              <div className={styles.wrapper}>
                <div className={styles.wrapperContainer}>
                  <div className={styles.inputContainer}>
                    <div className={styles.subTitle} />
                    <InputTag type="text" label="Type" name="type" />
                    <InputTag type="text" label="Zipcode" name="zipcode" />
                    <InputTag type="text" label="City" name="city" />
                    <InputTag type="text" label="Address" name="address" />
                    <InputTag type="number" label="Property size" name="size" />
                    <InputTag type="number" label="Price" name="price" />
                  </div>
                </div>

                <div className={styles.wrapperContainer}>
                  <div className={styles.inputContainer}>
                    <div className={styles.subTitle} />
                    <InputTag type="checkbox" label="Wifi" name="wifi" />
                    <InputTag type="checkbox" label="Animals" name="animals" />
                    <InputTag
                      type="checkbox"
                      label="Family Friendly"
                      name="family"
                    />
                    <div className={styles.submitContainer}>
                      <button className={styles.submitButton}>
                        Create property
                      </button>
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
