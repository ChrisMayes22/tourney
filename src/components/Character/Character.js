import React from 'react';
import classes from './Character.css';
import RatingRow from '../../containers/RatingRow/RatingRow';

const Character = (props) => {
    return(
            <section className={classes.flexContainer__col}>
                <img 
                    src={props.character.imageUrl} 
                    className={classes.characterPortrait}
                    alt="character card"
                />
                <RatingRow 
                    character={props.character}
                    rowId={`${props.character.id}-row-one`}/>
                <RatingRow 
                    character={props.character}
                    rowId={`${props.character.id}-row-two`}/>
                <RatingRow 
                    character={props.character}
                    rowId={`${props.character.id}-row-three`}/>  
                <RatingRow 
                    character={props.character}
                    rowId={`${props.character.id}-row-four`}/>             
            </section> 
    );
}

export default Character;