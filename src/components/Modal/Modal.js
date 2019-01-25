import React from 'react';
import classes from './Modal.css'

const modal = (props) => {
    return(
        <div className={classes.modalBackground} id={props.id}>
            <aside className={[classes.modal, props.sizing].join(' ')}>
                {props.children}
            </aside> 
        </div>
    );
}

export default modal