import React, { Component } from 'react';
import classes from './Winner.css';
import { connect } from 'react-redux';
import CharacterArray from '../../components/CharacterArray/CharacterArray';
import * as loserSettings from '../../components/CharacterArray/LoserSettings';

export class Winner extends Component{

    render(){
        return(
            <React.Fragment>
                <main className={classes.flexContainer__col}>
                    <h1 className={classes.eliminationHeader}>WINNER!!</h1>
                    <CharacterArray characters={this.props.characters} loserSettings={null} imageClass={classes.mainImg}/>
                </main>
                <section className={classes.grid}>
                    <h5 className={classes.otherLosersHeader}>~ The Losers ~</h5>
                    <CharacterArray characters={this.props.characters} loserSettings={loserSettings.DISPLAY_ALL_LOSERS}/>
                </section>
            </React.Fragment>
        );
    }
}

let mapStateToProps = state => {
    return {
        characters: state.characters
    }
};

export default connect(mapStateToProps, null)(Winner);