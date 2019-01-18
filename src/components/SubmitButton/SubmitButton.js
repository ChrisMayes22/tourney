import React from 'react';
import classes from './SubmitButton.css';

const submitButton = (props) => {
    return(
        <button 
            className={classes.submit}
            onClick={props.clicked}
            id={props.id}>
            {props.children}
        </button>
    );
}

export default submitButton;