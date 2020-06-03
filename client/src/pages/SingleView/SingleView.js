import React, { Component } from "react";
import { withRouter } from 'react-router-dom'

// Styles
import styles from "./SingleView.module.css";
import InputTag from "../../components/forms/InputTag";

class SingleView extends Component {
  state = {
    checkIn: null,
    checkOut: null,
    days: null,
    dailyPrice: 300,
    guests: null,
    loggedIn: false,

    data: null,
    isLoading: true
  };

  componentDidMount = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get('id')
    console.log(id)

    await fetch(`http://localhost:8080/property?id=${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res, isLoading: false })
        console.log(res);

      })
      .catch(error => console.log(error))


  }


  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  calculateDays = () => {
    const { checkIn, checkOut, days } = this.state;
    console.log(checkIn);
    if (checkIn && checkOut) {
      const getCheckIn = new Date(`${checkIn}`);
      const getCheckOut = new Date(`${checkOut}`);
      const differenceInTime = getCheckOut.getTime() - getCheckIn.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      if (differenceInDays !== days) {
        this.setState({ days: differenceInDays });
      }
      return this.calculateTotalPrice();
    }
  };

  calculateTotalPrice = () => {
    const { dailyPrice, days } = this.state;

    const totalPrice = dailyPrice * days;

    return `${dailyPrice} X ${days} day(s) = ${totalPrice}`;
  };


  render() {
    console.log(this.props.location.data)
    // const {
    //   title,
    //   body,
    //   cost,
    //   currency,
    //   timeFormat,
    //   nPropertyID
    // } = this.props.location.data

    const property = {
      owner: "Elias Marco Lip FK",
      type: "House FK",
      city: "Copenhagen FK",
      title: "yeet house",
      body:
        "This is a house blablablalbla - more houseoes hsouehsouehoseuhosuehs",
      address: "Somegade 24",
      size: 4,
      houseSize: 200,
      price: 300,
      currency: "$"
    };

    const propertyAssets = {
      wifi: "Yes",
      pets: "Pets allowed"
    };

    return (
      <main className={styles.mainContainer}>
        <section className={styles.sectionContainer}>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.spaceBetween}>
                <div className={styles.containerPadding}>
                  <div>
                    <h1 className={styles.title}>
                      {property.title}
                    </h1>
                  </div>
                  <div className={styles.bodyContent}>
                    <p>
                      {property.body}
                    </p>
                  </div>
                </div>

                <div className={styles.widgetWrapperContainer}>
                  <div className={styles.widgetContainer}>
                    <div className={styles.widgetWrapperItem}>
                      <div className={styles.widgetIcon}>icon</div>
                      <div className={styles.widgetValue}>
                        <p>
                          {property.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.widgetContainer}>
                    <div className={styles.widgetWrapperItem}>
                      <div className={styles.widgetIcon}>icon</div>
                      <div className={styles.widgetValue}>
                        <p>
                          {property.houseSize}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.widgetContainer}>
                    <div className={styles.widgetWrapperItem}>
                      <div className={styles.widgetIcon}>icon</div>
                      <div className={styles.widgetValue}>
                        <p>
                          {property.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.widgetContainer}>
                    <div className={styles.widgetWrapperItem}>
                      <div className={styles.widgetIcon}>icon</div>
                      <div className={styles.widgetValue}>
                        <p>
                          {property.size}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.imageContainer}>
                IMAGE HER + CSS BACKGROUND POS?
              </div>
            </div>
          </div>
        </section>
        <section className={styles.sectionContainer}>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.containerPadding}>
                <div className={styles.propertyInfoTitle}>
                  <h2>Property information</h2>
                </div>
                {/* loop alle property info??? */}
                <div className={styles.propertyInfoItem}>
                  <h3>Wifi</h3>
                  <p>
                    {propertyAssets.wifi}
                  </p>
                </div>
                <div className={styles.propertyInfoItem}>
                  <h3>Pets</h3>
                  <p>
                    {propertyAssets.pets}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.bookingContainer}>
                <div className={styles.bookingTitle}>
                  <h2>Booking</h2>
                  <h3>
                    {property.price + property.currency} / night
                  </h3>
                </div>
                <div className={styles.formContainer}>
                  <form className={styles.form}>
                    <div className={styles.wrapper}>
                      <div className={styles.inputCheckout}>
                        <InputTag
                          type="date"
                          label="Checkin/Checkout"
                          name="checkIn"
                          name2="checkOut"
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className={styles.inputGuests}>
                        <InputTag
                          type="text"
                          label="Guests"
                          name="guests"
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className={styles.submitContainer}>
                      <button className={styles.submitButton}>Book now</button>
                    </div>
                  </form>
                  <div className={styles.bookingInfo}>
                    <div className={styles.bookingWrapper}>
                      <p>
                        {this.calculateDays()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}


export default withRouter(SingleView);