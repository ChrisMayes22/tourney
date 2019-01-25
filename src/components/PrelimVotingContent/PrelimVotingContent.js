import React from 'react';
import classes from './PrelimVotingContent.css';
import Character from '../Character/Character';

const prelimVotingContent = (props) => {
    return(
        props.characters.filter(char => !char.hadTurn).map(char => {
            return (
                <section className={classes.competitorImage} key={`${char.id}-section`}>
                    <Character 
                        players={props.players} 
                        character={char}
                        clicked={props.clicked}/>
                </section>
            )})
    )}

export default prelimVotingContent;