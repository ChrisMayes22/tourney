import React from 'react';
import classes from './SubmitButton.css';

const submitButton = (props) => {
    return(
        <button className={classes.submit}>
            Submit
        </button>
    );
}

export default submitButton;