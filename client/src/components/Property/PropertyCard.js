import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Styles
import styles from './PropertyCard.module.css'

class PropertyCard extends Component {

    seeProperty = (id) => {
        const {
            checkIn,
            checkOut
        } = this.props.searchQueries

        window.scrollTo(0, 0);
        this.props.history.push({
            pathname: "/property",
            search: `?id=${id}&checkIn=${checkIn}&checkOut=${checkOut}`
        })
    }

    render() {
        const {
            cTitle,
            cDescription,
            nPropertyID,
            byteaImage
        } = this.props.data

        console.log(this.props.data.property)

        return (
            <div className={styles.container}>
                <div className={styles.propertyImage} style={{
                    backgroundImage: `url("${byteaImage}")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }} />
                <div className={styles.content}>
                    <h3 className={styles.headline}>{cTitle}</h3>
                    <div className={styles.body}>
                        <div>
                            <button className={styles.viewButton} onClick={() => this.seeProperty(nPropertyID)}>View</button>
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