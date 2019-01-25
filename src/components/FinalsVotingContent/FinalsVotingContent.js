import React from 'react';
import classes from './FinalsVotingContent.css';
import Character from '../Character/Character';

const finalsVotingContent = (props) => {
    return(
        <React.Fragment>
            <section className={classes.imageOne}>
                <Character 
                    players ={props.players} 
                    finals={true}
                    character={props.characters.filter(el => !el.isEliminated.check)[0]} 
                    characters={props.characters.filter(el => !el.isEliminated.check)} 
                    clicked={() => props.clicked(props.characters.filter(el => !el.isEliminated.check)[1])}
                    id={'first-char'}/>
            </section>
            <section className={classes.imageTwo}>
                <Character 
                    players ={props.players} 
                    finals={true}
                    character={props.characters.filter(el => !el.isEliminated.check)[1]} 
                    characters={props.characters.filter(el => !el.isEliminated.check)} 
                    clicked={() => props.clicked(props.characters.filter(el => !el.isEliminated.check)[0])}
                    id={'second-char'}/>
            </section>
        </React.Fragment>
    );
}

export default finalsVotingContent;