import React, {Component } from 'react';
import Character from '../../components/Character/Character';
import classes from './VotingPage.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../constants/actions';
import * as urls from '../../constants/urls';

export class VotingPage extends Component {

    playersArray= this.props.characters.filter(char => !char.hadTurn)


    render () {

        return(
            <React.Fragment>
                <main className={this.props.players == 3 ? classes.grid__3Players : classes.grid__4Players}>
                    {this.props.characters.filter(char => !char.hadTurn).map(char => {
                            return (
                                <section className={classes.competitorImage} key={`${char.id}-section`}>
                                    <Character players={this.props.players} character={char}/>
                                </section>
                            );
                    })}
                </main>
                <footer>
                    <Link 
                        onClick={() => this.props.onSubmitRatings(this.playersArray)}
                        to={urls.UPLOAD_PAGE}>
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