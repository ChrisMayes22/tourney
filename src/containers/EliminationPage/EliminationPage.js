import React, { Component } from 'react';
import classes from './EliminationPage.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import {removeLowestScore, beginFinals } from '../../constants/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as urls from '../../constants/urls';
import CharacterArray from '../../components/CharacterArray/CharacterArray'
import * as loserSettings from '../../components/CharacterArray/LoserSettings'

export class EliminationPage extends Component{

    render(){
        return(
            <React.Fragment>
                <main className={classes.flexContainer__col}>
                    <h1 className={classes.eliminationHeader}>ELIMINATED!!</h1>
                    <div className={classes.mainImageContainer}>
                        <CharacterArray characters={this.props.characters} loserSettings={loserSettings.ISOLATE_MOST_RECENT_LOSER}/>
                    </div>
                    <Link   to={this.props.characters.filter(char => !char.isEliminated.check).length < 7 ? urls.VOTING_PAGE : urls.ELIMINATION_PAGE}
                            onClick={this.props.characters.filter(char => !char.isEliminated.check).length > 6 ? 
                                                                                    this.props.onEliminate :   
                                                                                    this.props.onFinals}>
                        <SubmitButton 
                            id={'EliminationPage__continueButton'}
                            children={this.props.characters.filter(char => !char.isEliminated.check).length < 7 ? 
                                'On to the finals!' : 'Eliminate another!'}/>
                    </Link>
                </main>
                <section className={classes.grid}>
                    <h5 className={classes.otherLosersHeader}>~ The Other Losers ~</h5>
                    {this.props.characters.filter(char => char.isEliminated.check).length > 1 ? 
                        <CharacterArray characters={this.props.characters} loserSettings={loserSettings.EXCLUDE_MOST_RECENT_LOSER}/> : null}
                </section>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEliminate: () => dispatch(removeLowestScore()),
        onFinals: () => dispatch(beginFinals())
    }
}

let mapStateToProps = state => {
    return {
        characters: state.characters
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EliminationPage);