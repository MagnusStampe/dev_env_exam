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
    data: {},
    isLoading: true
  };

  componentDidMount = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get('id')

    await fetch(`http://localhost:8080/property?id=${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res.results, isLoading: false })
        console.log(res);
        console.log(this.state.data);
      })
      .catch(error => console.log(error))
  }


  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  calculateDays = () => {
    const {
      state: {
        days
      }
    } = this;

    const searchQueries = {}

    if (searchQueries.checkIn && searchQueries.checkOut) {
      const getCheckIn = new Date(`${searchQueries.checkIn}`);
      const getCheckOut = new Date(`${searchQueries.checkOut}`);

      const differenceInTime = getCheckOut.getTime() - getCheckIn.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      if (differenceInDays !== days) this.setState({ days: differenceInDays });

      return this.calculateTotalPrice();
    }
  };

  calculateTotalPrice = () => {
    const { dailyPrice, days } = this.state;

    const totalPrice = dailyPrice * days;

    return `${dailyPrice}$ X ${days} day(s) = ${totalPrice}$`;
  };


  render() {

    const {
      data: {
        cTitle,
        cDescription,
        nPrice,
        cAddress,
        cPropertyType,
        nHouseSize,
        byteaImage,
        bAnimals,
        bEthernet,
        bFamilyFriendly
      }
    } = this.state;


    return (
      <main className={styles.mainContainer}>
        <section className={styles.sectionContainer}>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.spaceBetween}>
                <div className={styles.containerPadding}>
                  <div>
                    <h1 className={styles.title}>
                      {cTitle}
                    </h1>
                  </div>
                  <div className={styles.bodyContent}>
                    <p>
                      {cDescription}
                    </p>
                  </div>
                </div>

                <div className={styles.widgetWrapperContainer}>
                  <div className={styles.widgetContainer}>
                    <div className={styles.widgetWrapperItem}>
                      <div className={styles.widgetIcon}>Size: </div>
                      <div className={styles.widgetValue}>
                        <p>
                          {nHouseSize} Sqm
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.widgetContainer}>
                    <div className={styles.widgetWrapperItem}>
                      <div className={styles.widgetIcon}>Type: </div>
                      <div className={styles.widgetValue}>
                        <p>
                          {cPropertyType}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.widgetContainer}>
                    <div className={styles.widgetWrapperItem}>
                      <div className={styles.widgetIcon}></div>
                      <div className={styles.widgetValue}>
                        <p>
                          {nPrice} $$ / night
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.container}>
              <div className={styles.imageContainer} style={{
                backgroundImage: `url("${byteaImage}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.sectionContainer}>
          <div className={styles.wrapper}>
            <div className={styles.infoContainer}>
              <div className={styles.containerPadding}>
                <div className={styles.propertyInfoTitle}>
                  <h2>Property information</h2>
                </div>
                <div className={styles.propertyInfoItem}>
                  <h3>Address</h3>
                  <p>{cAddress}</p>
                </div>
                {bEthernet && <div className={styles.propertyInfoItem}>
                  <h3>Wifi</h3>
                  <p>
                    There is Wifi
                  </p>
                </div>
                }
                {bAnimals && <div className={styles.propertyInfoItem}>
                  <div className={styles.propertyInfoItem}>
                    <h3>Pets</h3>
                    <p>
                      Pets is allowed on
                    </p>
                  </div>
                </div>
                }
                {bFamilyFriendly && <div className={styles.propertyInfoItem}>
                  <div className={styles.propertyInfoItem}>
                    <h3>Family Friendly</h3>
                    <p>
                      This property is family friendly
                    </p>
                  </div>
                </div>
                }
              </div>
            </div>



            <div className={styles.container}>
              <div className={styles.bookingContainer}>
                <div className={styles.bookingTitle}>
                  <h2>Booking</h2>
                  <h3>{nPrice}$ / night {this.calculateDays()}</h3>
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