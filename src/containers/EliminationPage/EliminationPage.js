import React, { Component } from 'react';
import classes from './EliminationPage.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import {removeLowestScore } from '../../constants/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as urls from '../../constants/urls';

export class EliminationPage extends Component{

    render(){
        return(
            <React.Fragment>
                <main className={classes.flexContainer__col}>
                    <h1 className={classes.eliminationHeader}>ELIMINATED!!</h1>
                    <div className={classes.mainImageContainer}>
                        {[this.props.characters.filter(char => char.isEliminated.check)
                            .reduce(function(accumulator, currentValue){
                                if(accumulator.isEliminated.whenEliminated < currentValue.isEliminated.whenEliminated) {
                                    return currentValue;
                                } else {
                                    return accumulator;
                                }
                            })].map(function(char){ 
                                return(<img src={char.imageUrl} id={char.id} key={`${char.id}-key`} alt="The most recent losing competitor"/>);
                            })}
                    </div>
                    <Link  to={this.props.characters.filter(char => !char.isEliminated.check).length < 7 ? urls.FINALS_PAGE : urls.ELIMINATION_PAGE}
                        onClick={this.props.characters.filter(char => !char.isEliminated.check).length > 6 ? this.props.onEliminate : null}>
                        <SubmitButton 
                            id={'EliminationPage__continueButton'}
                            children={this.props.characters.filter(char => !char.isEliminated.check).length < 7 ? 
                                'On to the finals!' : 'Eliminate another!'}/>
                    </Link>
                </main>
                <section className={classes.grid}>
                    <h5 className={classes.otherLosersHeader}>~ The Other Losers ~</h5>
                    {this.props.characters.filter(char => char.isEliminated.check).length > 1? this.props.characters.filter(char => char.isEliminated.check).filter(
                        char => char.id !== (this.props.characters.reduce(function(accumulator, currentValue){
                            if(accumulator.isEliminated.whenEliminated < currentValue.isEliminated.whenEliminated) {
                                return currentValue;
                            } else {
                                return accumulator;
                            }
                        })).id).map(function(char){
                                return (<img src={char.imageUrl} key={char.id} className={classes.refImg} alt="a losing competitor"/>)
                        }) : null}
                </section>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEliminate: () => dispatch(removeLowestScore())
    }
}

let mapStateToProps = state => {
    return {
        characters: state.characters
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EliminationPage);