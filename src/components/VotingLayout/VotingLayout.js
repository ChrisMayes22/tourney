import React from 'react';
import classes from './VotingLayout.css';

const votingLayout = (props) => {

    let grid = null;
    if((props.finals) || (props.players === 2)){
        grid = classes.twoPlayerGrid;
    } else if(props.players === 3) {
        grid = classes.threePlayerGrid;
    } else if(props.players === 4) {
        grid = classes.fourPlayerGrid;
    }

    return (
        <main className={grid}>
            {props.children}
        </main>
    );
}

export default votingLayout