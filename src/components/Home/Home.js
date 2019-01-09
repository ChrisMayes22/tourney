import React from 'react';
import classes from './Home.css';
import SubmitButton from '../SubmitButton/SubmitButton';

const home = (props) => {
    return(
        <div className={classes.background}>
            <nav className={classes.ui}>
                <h3>How many judges are joining us...?</h3>
                <input type="number"></input>
                <SubmitButton/>
            </nav>
        </div>
    )
}

export default home;