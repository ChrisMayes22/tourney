import React from 'react';
import classes from './CharacterRedirect.css';
import SubmitButton from '../SubmitButton/SubmitButton';
import * as urls from '../../constants/urls';
import { Link } from 'react-router-dom';

const characterRedirect = () => {
    return(
        <div className={classes.background}>
            <nav className={classes.ui}>
                <h3>Each players should upload exactly one character per round.</h3>
                <Link to={urls.UPLOAD_PAGE}>
                    <SubmitButton children={"OK"}/>
                </Link>
            </nav>
        </div>
    )
}

export default characterRedirect;