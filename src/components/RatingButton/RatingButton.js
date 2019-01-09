import React from 'react';
import classes from './RatingButton.css';

const ratingButton = (props) => {
    return(
        <button 
            className={[classes.button__rating, props.quality, props.chosen].join(' ')}
            onClick={props.clicked}>
                {props.children}
        </button>
    );
}

export default ratingButton;