import React from 'react';
import Loser from '../Loser/Loser';
import * as loserSettings from './LoserSettings';

export const CharacterArray = (props) =>{
    let eliminatedCharacters = props.characters.filter(char => char.isEliminated.check);
    let mostRecentLoser;

    if(eliminatedCharacters.length > 0){
        mostRecentLoser = eliminatedCharacters.reduce(function(accumulator, currentValue){
            if(accumulator.isEliminated.whenEliminated < currentValue.isEliminated.whenEliminated) {
                return currentValue;
            } else {
                return accumulator;
            }
         })
    }
    

    let array;

    switch(props.loserSettings){
        case loserSettings.ISOLATE_MOST_RECENT_LOSER:
            array = eliminatedCharacters.filter(char => char.id === mostRecentLoser.id)
                                    .map((char, i) => <Loser imageUrl={char.imageUrl} key={char.id} id={char.id}/>);
            break;
        case loserSettings.EXCLUDE_MOST_RECENT_LOSER:
            array = eliminatedCharacters.filter(char => char.id !== mostRecentLoser.id)
                                    .map((char, i) => <Loser imageUrl={char.imageUrl} key={char.id} id={char.id}/>);
            break;
        case loserSettings.DISPLAY_ALL_LOSERS:
            array = eliminatedCharacters.map((char, i) => <Loser imageUrl={char.imageUrl} key={char.id} id={char.id}/>);
            break;
        default:
            array = props.characters.filter(char => !char.isEliminated.check)
                                    .map((char, i) => <img 
                                                        src={char.imageUrl} 
                                                        className={props.imageClass} 
                                                        key={char.id} 
                                                        id={char.id}
                                                        alt="one of the competing items"/>)
    }

    return array
}

export default CharacterArray;