import React, {Component } from 'react';
import Character from '../../components/Character/Character';
import classes from './VotingPage.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../reducers/actions';

class VotingPage extends Component {

    playersArray= this.props.characters.filter(char => !char.hadTurn)


    render () {

        return(
            <React.Fragment>
                {'PLAYERS ARRAY'}
                {console.log(this.playersArray)}
                <main className={this.props.players == 3? classes.grid__3Players : classes.grid__4Players}>
                    {this.props.characters.filter(char => !char.hadTurn).map(char => {
                        if(this.props.characters.filter(char => !char.hadTurn).findIndex(index => index.id === char.id) < this.props.players){
                            return (
                                <section className={classes.competitorImage}>
                                    <Character players={this.props.players} character={char}/>
                                </section>
                            );
                        }
                        return null;
                    })}
                </main>
                <footer>
                    <Link 
                        onClick={() => this.props.onSubmitRatings(this.playersArray)}
                        to='/upload-page'>
                            <SubmitButton children={"Submit"}/>
                    </Link>
                </footer>
            </React.Fragment>
        );
    }
}

    

const mapStateToProps = state => {
    return {
        characters: state.characters,
        players: state.players
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitRatings: (playersArray) => {
            dispatch({type: actionTypes.SUBMIT_CHARACTER_RATINGS, payload:{
                players: playersArray
            }});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VotingPage);