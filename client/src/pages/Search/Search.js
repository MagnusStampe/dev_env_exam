import React, { Component } from 'react'

// Components
import PropertyCard from './../../components/Property/PropertyCard'

// Styles
import styles from './Search.module.css'

export default class Search extends Component {
    state = {
        isLoading: true,
        data: ""
    }

    async componentDidMount() {
        const { checkIn, checkOut } = this.props.searchQueries;
        console.log(checkIn);
        console.log(checkOut);
        if (!checkIn || !checkOut) return
        await fetch(`http://localhost:8080/properties?startDate=${checkIn}&endDate=${checkOut}`)
            .then(res => res.json())
            .then(res => {
                this.setState({ data: res, isLoading: false })
                console.log(res);

            })
            .catch(error => console.log(error))


    }


    render() {
        const { isLoading, data } = this.state;
        // console.log(this.props.searchQueries);
        // const property = {
        //     title: 'Hus',
        //     body: [
        //         'Cozy apartment in the middle of Copenhagen, perfect camp fora couple of days in this amazing city.',
        //         'Give your self a special treatment in luxury and modern surroundings'
        //     ],
        //     cost: '130',
        //     currency: '$',
        //     timeFormat: 'day'
        // }

        return (
            <main className={styles.searchContainer}>
                <h1 className={styles.headline}>Our available properties in Copenhagen:</h1>
                <section className={styles.propertiesContainer}>
                    {isLoading
                        ? <div>Loading</div>
                        : data.results.map((property, key) => {
                            console.log(property);
                            return (
                                <PropertyCard key={key} data={property} />
                            )
                        })
                    }
                </section>
                <button className={styles.loadMoreButton}>Load more...</button>
            </main>
        )
    }
}