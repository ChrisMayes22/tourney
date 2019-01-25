import React from 'react';
import classes from './Loser.css';

const loser = (props) => <img src={props.imageUrl} className={classes.loser} alt="a losing competitor"/>

export default loser;