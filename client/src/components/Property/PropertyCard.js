import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Styles
import styles from './PropertyCard.module.css'

class PropertyCard extends Component {

    seeProperty = (id) => {
        // await fetch(`http://localhost:8080/property?id=${id}`)
        //     .then(res => res.json())
        //     .then(res => {
        this.props.history.push({
            pathname: "/property",
            search: `?id=${id}`
        })
    }
    render() {
        const {
            title,
            body,
            cost,
            currency,
            timeFormat,
            nPropertyID

        } = this.props.data

        return (
            <div className={styles.container}>
                <div className={styles.propertyImage} />
                <div className={styles.content}>
                    <h3 className={styles.headline}>{title}</h3>
                    <div className={styles.body}>
                        {body ? (
                            body.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))
                        ) : (
                                <div>
                                    <button onClick={() => this.seeProperty(nPropertyID)}>View</button>
                                    <p>Nso description provided</p>
                                </div>
                            )}
                        <div className={styles.bodyFadeOut} />
                    </div>
                    <div className={styles.price}>{cost + currency + ' / ' + timeFormat}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(PropertyCard);