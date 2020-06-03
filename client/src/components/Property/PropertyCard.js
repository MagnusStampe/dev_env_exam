import React, { Component } from 'react'

// Styles
import styles from './PropertyCard.module.css'

export default class PropertyCard extends Component {
    render() {
        const {
            data: {
                title,
                body,
                cost,
                currency,
                timeFormat
            }
        } = this.props

        return (
            <div className={styles.container}>
                <div className={styles.propertyImage} />
                <div className={styles.content}>
                    <h3 className={styles.headline}>{title}</h3>
                    <div className={styles.body}>
                        {Array.isArray(body) ? (
                            body.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))
                        ) : (
                            <p>{body}</p>
                            )}
                        <div className={styles.bodyFadeOut} />
                    </div>
                    {cost && currency && timeFormat && <div className={styles.price}>{cost + currency + ' / ' + timeFormat}</div>}
                </div>
            </div>
        )
    }
}