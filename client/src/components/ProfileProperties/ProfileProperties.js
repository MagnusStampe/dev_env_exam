import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Styles
import styles from './ProfileProperties.module.css';

export default class ProfileProperties extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h2>Properties</h2>
                <Link to="/create-property">Create property</Link>
                
            </div>
        )
    }
}