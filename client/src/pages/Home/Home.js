import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Component
import InputTag, { TextareaTag } from './../../components/forms/InputTag'
import LocationWidget from './../../components/Home/LocationWidget'

// Styles
import styles from './Home.module.css'

export default class Home extends Component {
    state = {
        isRed: true
    }
    render() {

        return (
            <main className={styles.pageContainer}>
                <section className={styles.textContainer}>
                    <h2 className={styles.headline}>Your home in the holidays -<br />Start your search now.</h2>
                    <form className={styles.form}>
                        <InputTag type="text" label="Destination" name="destTxt" />
                        <InputTag type="date" label="Check in / check out" name="checkInOutTxt1" name2="checkInOutTxt2" />
                        <InputTag type="number" label="Guests" name="guestsTxt" />
                        <button className={styles.submitButton}>PIL</button>
                    </form>
                </section>
                <section className={styles.imageContainer}>
                    <div className={styles.imageContent}>
                        <div className={styles.wideImageContent}>
                            <Link className={styles.categoryButtons}>Explore the world PIL</Link>
                        </div>
                        <div className={styles.thinImageContent}>
                            <Link className={styles.categoryButtons}>Rustic and natural PIL</Link>
                        </div>
                        <div className={styles.thinImageContent}>
                            <Link className={styles.categoryButtons}>Warm and cozy PIL</Link>
                        </div>
                    </div>
                </section>
                <section className={styles.imageContainer}></section>
                <section className={styles.textContainer}>
                    <div className={styles.blueLine} />
                    <h2 className={styles.headline}>We strive to find the perfect fit for your next holiday</h2>
                    <div className={styles.bodyText}>
                        <p>
                            Lorem ipsum dolor sit amet, rhoncus libero, quis quisque,
                            risus pede. Orci vitae, sagittis urna vestibulum.
                            In nec, in in imperdiet, accumsan praesent.
                            Pellentesque tellus varius.
                        </p>
                    </div>
                </section>
                <LocationWidget />
                <section className={styles.textContainer}>
                    <div className={styles.blueLine} />
                    <h2 className={styles.headline}>Please do write us if you need help or guidance regarding your safestay</h2>
                    <form className={styles.form}>
                        <InputTag type="email" label="Email" name="EmailTxt" />
                        <TextareaTag label="Subject" name="BodyTxt" />
                        <button className={styles.submitButton}>PIL</button>
                    </form>
                </section>
                <section className={styles.imageContainer}></section>

            </main>
        )
    }
}