import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Styles
import styles from './PropertyCard.module.css'

class PropertyCard extends Component {

    seeProperty = (id) => {
        this.props.history.push({
            pathname: "/property",
            search: `?id=${id}`
        })
    }
    render() {
        const {
            cTitle,
            cDescription,
            nPrice,
            cHouseSize,
            nSize,
            nPropertyID
        } = this.props.data

        console.log(this.props.data)

        return (
            <div className={styles.container}>
                <div className={styles.propertyImage} />
                <div className={styles.content}>
                    <h3 className={styles.headline}>{cTitle}</h3>
                    <div className={styles.body}>
                        <div>
                            <button onClick={() => this.seeProperty(nPropertyID)}>View</button>
                            <p>{cDescription}</p>
                        </div>
                        <div className={styles.bodyFadeOut} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(PropertyCard);