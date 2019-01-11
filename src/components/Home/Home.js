import React from 'react';
import classes from './Home.css';
import SubmitButton from '../SubmitButton/SubmitButton';
import { Link } from 'react-router-dom';

const home = () => {
    return(
        <div className={classes.background}>
            <nav className={classes.ui}>
                <h3>How many judges are joining us...?</h3>
                <input type="number"></input>
                <Link to="/upload-page">
                    <SubmitButton children={"Submit"}/>
                </Link>
            </nav>
        </div>
    )
}

export default home;