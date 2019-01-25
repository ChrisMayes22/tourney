import React from 'react';
import classes from './Character.css';
import RatingRow from '../RatingRow/RatingRow';
import SubmitButton from '../SubmitButton/SubmitButton';
import * as urls from '../../constants/urls';
import { Link } from 'react-router-dom';

export const Character = (props) => {

    const arr = new Array(props.players).fill(null).map((_, index) => index);

    return(
            <section className={classes.flexContainer__col}>
                <img 
                    src={props.character.imageUrl} 
                    className={classes.characterPortrait}
                    alt="One of the images chosen for competition"
                />
                {props.finals ? <Link 
                                    to= {props.characters.length === 2 ? urls.WINNER_PAGE : urls.FINALS_PAGE}
                                    onClick={props.clicked}>
                                    <SubmitButton>
                                        Winner!
                                    </SubmitButton>
                                </Link> : arr.map((number) => {
                    return<RatingRow 
                            character={props.character}
                            rowId={`${props.character.id}-row-${number+1}`}
                            key={`key:${props.character.id}-row-${number+1}`}
                            id={`id:${props.character.id}-row-${number+1}`}
                            clicked={props.clicked}/>
                })}           
            </section> 
    );
}

export default Character;