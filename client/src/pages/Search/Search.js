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

        return (
            <main className={styles.searchContainer}>
                <h1 className={styles.headline}>Our available properties in Copenhagen:</h1>
                <section className={styles.propertiesContainer}>
                    {isLoading
                        ? <div>Loading</div>
                        : data.results.map((property, key) => {
                            console.log(property);
                            return (
                                <PropertyCard key={key} data={property} searchQueries={this.props.searchQueries} />
                            )
                        })
                    }
                </section>
                <button className={styles.loadMoreButton}>Load more...</button>
            </main>
        )
    }
}