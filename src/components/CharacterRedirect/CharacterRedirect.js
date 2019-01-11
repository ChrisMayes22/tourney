import React from 'react';
import classes from './CharacterRedirect.css';
import SubmitButton from '../SubmitButton/SubmitButton';
import { Link } from 'react-router-dom';

const characterRedirect = () => {
    return(
        <div className={classes.background}>
            <nav className={classes.ui}>
                <h3>Please upload exactly three characters to begin!</h3>
                <Link to="/upload-page">
                    <SubmitButton children={"OK"}/>
                </Link>
            </nav>
        </div>
    )
}

export default characterRedirect;