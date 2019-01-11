import React, {Component } from 'react';
import Character from '../../components/Character/Character';
import classes from './VotingPage.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../reducers/actions';

class VotingPage extends Component {

    state = {
        modal: true
    }

    players= {
        one: this.props.characters.filter(el => !el.hadTurn)[0],
        two: this.props.characters.filter(el => !el.hadTurn)[1],
        three: this.props.characters.filter(el => !el.hadTurn)[2]
    }

    removeModalHandler = () =>{
        const toggleModal = !this.state.modal;
        this.setState({
            modal: toggleModal
        })
    }

    modalManager = (playerOne, playerTwo, playerThree) => {
        this.removeModalHandler();
        this.props.onClearModal(playerOne, playerTwo, playerThree);
    }

    render () {

        return(
            <React.Fragment>
                {this.state.modal ? <div className={classes.modalBackground}>
                    <aside className={classes.modal}>
                        <div className={classes.modalFlexContainer}>
                            <img 
                                className={classes.modalImage}
                                src={this.players.one.imageUrl}/>
                            <img 
                                className={classes.modalImage}
                                src={this.players.two.imageUrl}/>
                            <img 
                                className={classes.modalImage}
                                src={this.players.three.imageUrl}/>
                        </div>
                        ARE THESE CHARACTERS OK?
                        <br/>
                        <SubmitButton 
                            children={'Yes!'}
                            clicked={() => this.modalManager(this.players.one, this.players.two, this.players.three)}/>
                        <Link to={'/upload-page'}>
                            <SubmitButton children={'No, take me back.'}/>
                        </Link>
                    </aside>
                </div> : null}
                <main className={classes.grid}>
                    <section className={classes.imageOne}>
                        <Character character={this.players.one}/>
                    </section>
                    <section className={classes.imageTwo}>
                        <Character character={this.players.two}/>
                    </section>
                    <section className={classes.imageThree}>
                        <Character character={this.players.three}/>
                    </section>
                    <footer>
                        <Link 
                            onClick={() => this.props.onSubmitRatings(this.players.one, this.players.two, this.players.three)}
                            to='/upload-page'>
                                <SubmitButton children={"Submit"}/>
                        </Link></footer>
                </main>
                {console.log('CURRENT POINTS:')}
                {console.log(this.props.characterRatings)}
            </React.Fragment>
        );
    }
}

    

const mapStateToProps = state => {
    return {
        characters: state.characters,
        inPlayIndices: state.inPlayIndices,
        characterRatings: state.characterRatings
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onClearModal: (playerOneId, playerTwoId, playerThreeId) => {
            dispatch({type: actionTypes.MATCH_CHARACTERS_AND_ROWS, payload: {
                playerOne: playerOneId, 
                playerTwo: playerTwoId, 
                playerThree: playerThreeId
            }});
        },
        onSubmitRatings: (playerOne, playerTwo, playerThree) => {
            dispatch({type: actionTypes.SUBMIT_CHARACTER_RATINGS, payload:{
                playerOne: playerOne, playerTwo: playerTwo, playerThree: playerThree
            }});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VotingPage);