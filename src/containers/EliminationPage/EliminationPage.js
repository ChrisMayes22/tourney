import React, { Component } from 'react';
import classes from './EliminationPage.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import * as actionTypes from '../../reducers/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class EliminationPage extends Component{

    render(){
        return(
            <React.Fragment>
                <main className={classes.flexContainer__col}>
                    <h1 className={classes.eliminationHeader}>ELIMINATED!!</h1>
                    <div className={classes.mainImageContainer}>
                        {[this.props.characters.filter(char => char.isEliminated.check).reduce(function(accumulator, currentValue){
                            if(accumulator.isEliminated.whenEliminated < currentValue.isEliminated.whenEliminated) {
                                return currentValue;
                            } else {
                                return accumulator;
                            }
                        })].map(char => 
                            <img src={char.imageUrl} key={char.id} className={classes.mainImg} alt="a losing competitor"/>)}
                    </div>
                    <Link  to={this.props.characters.filter(char => !char.isEliminated.check).length < 7 ? '/finals' : '/elimination-page'}
                        onClick={this.props.characters.filter(char => !char.isEliminated.check).length > 5 ? this.props.onEliminate : null}>
                        <SubmitButton 
                            children={this.props.characters.filter(char => !char.isEliminated.check).length < 7 ? 
                                'On to the finals!' : 'Eliminate another!'}/>
                    </Link>
                </main>
                <section className={classes.grid}>
                    <h5 className={classes.otherLosersHeader}>~ The Other Losers ~</h5>
                    {this.props.characters.filter(char => char.isEliminated.check).filter(
                        char => char.id !== (this.props.characters.reduce(function(accumulator, currentValue){
                            if(accumulator.isEliminated.whenEliminated < currentValue.isEliminated.whenEliminated) {
                                return currentValue;
                            } else {
                                return accumulator;
                            }
                        }).id)).map(char => 
                        <img src={char.imageUrl} key={char.id} className={classes.refImg} alt="a losing competitor"/>)}
                </section>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEliminate: () => {
            dispatch({type: actionTypes.REMOVE_LOWEST_SCORE})
        }
    }
}

let mapStateToProps = state => {
    return {
        characters: state.characters
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EliminationPage);