import React, { Component } from "react";

import styles from "./CreateProperty.module.css";
import InputTag from "../../components/forms/InputTag";

export default class CreateProperty extends Component {
  state = {
    propertyType: '',
    zipCode: '',
    cityName: '',
    familyFriendly: false,
    houseSize: '',
    address: '',
    size: '',
    price: '',
    ethernet: false,
    animals: false
  }

  handleSubmit = async event => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state),
      credentials: 'include'
    };

    await fetch('http://localhost:8080/properties/create', options)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    const {    
      propertyType,
      zipCode,
      cityName,
      address,
      size,
      price,
    } = this.state;

    return (
      <main className={styles.mainContainer}>
        <div className={styles.container}>
          <h1 className={styles.title}>Create Property</h1>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={this.handleSubmit}>
              <div className={styles.wrapper}>
                <div className={styles.wrapperContainer}>
                  <div className={styles.inputContainer}>
                    <div className={styles.subTitle} />
                    <InputTag type="text" value={propertyType} label="Type" name="type" onChange={event => this.setState({propertyType: event.target.value})} />
                    <InputTag type="text" value={zipCode} label="Zipcode" name="zipcode" onChange={event => this.setState({zipCode: event.target.value})} />
                    <InputTag type="text" value={cityName} label="City" name="city" onChange={event => this.setState({cityName: event.target.value})} />
                    <InputTag type="text" value={address} label="Address" name="address" onChange={event => this.setState({address: event.target.value})} />
                    <InputTag type="number" value={size} label="Property size" name="size" onChange={event => this.setState({size: event.target.value})} />
                    <InputTag type="number" value={price} label="Price" name="price" onChange={event => this.setState({price: event.target.value})} />
                  </div>
                </div>

                <div className={styles.wrapperContainer}>
                  <div className={styles.inputContainer}>
                    <div className={styles.subTitle} />
                    <InputTag type="checkbox" label="Wifi" name="wifi" onChange={event => this.setState({ethernet: event.target.checked})} />
                    <InputTag type="checkbox" label="Animals" name="animals" onChange={event => this.setState({animals: event.target.checked})} />
                    <InputTag
                      type="checkbox"
                      label="Family Friendly"
                      name="family"
                      onChange={event => this.setState({familyFriendly: event.target.checked})}
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
