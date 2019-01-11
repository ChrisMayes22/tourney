import React from 'react';
import classes from './SubmitButton.css';

const submitButton = (props) => {
    return(
        <button 
            className={classes.submit}
            onClick={props.clicked}>
            {props.children}
        </button>
    );
}

export default submitButton;