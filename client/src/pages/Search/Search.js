import React, { Component } from 'react'

// Components
import PropertyCard from './../../components/Property/PropertyCard'

// Styles
import styles from './Search.module.css'

export default class Search extends Component {
    async componentDidMount() {
        await fetch('http://localhost:8080/properties?startDate=2030-11-11&endDate=2030-11-14')
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }

    render() {
        const property = {
            title: 'Hus',
            body: [
                'Cozy apartment in the middle of Copenhagen, perfect camp fora couple of days in this amazing city.',
                'Give your self a special treatment in luxury and modern surroundings'
            ],
            cost: '130',
            currency: '$',
            timeFormat: 'day'
        }

        return (
            <main className={styles.searchContainer}>
                <h1 className={styles.headline}>Our available properties in Copenhagen:</h1>
                <section className={styles.propertiesContainer}>
                    <PropertyCard data={property} />
                    <PropertyCard data={property} />
                    <PropertyCard data={property} />
                    <PropertyCard data={property} />
                    <PropertyCard data={property} />
                    <PropertyCard data={property} />
                </section>
                <button className={styles.loadMoreButton}>Load more...</button>
            </main>
        )
    }
}