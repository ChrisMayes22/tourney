import React, {Component } from 'react';
import Character from '../../components/Character/Character';
import classes from './FinalsPage.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../constants/actions';
import * as urls from '../../constants/urls';

class FinalsPage extends Component {

    state = {
        modal: true,
    }

    toggleModalHandler = () =>{
        const displayToggle = !this.state.modal;
        this.setState({
            modal: displayToggle
        })
    }

    startVotingHandler = (playerOne, playerTwo) => {
        this.toggleModalHandler();
        this.props.onClearModal(playerOne, playerTwo);
    }

    submitVotesHandler = (playerOne, playerTwo) => {
        this.props.onSubmitRatings(playerOne, playerTwo);
        this.props.onEliminate();
        this.toggleModalHandler();
    }

    render () {

        return(
            <React.Fragment>
                {this.state.modal ? <div className={classes.modalBackground}>
                    <aside className={classes.modal}>
                        <h1>Only these few remain!</h1>
                        <h5>From now on, matches will be single elimination.</h5>
                        <div className={classes.modalFlexContainer}>
                            {this.props.characters.filter(el => !el.isEliminated.check).map(char => {
                                return <img 
                                    src={char.imageUrl} 
                                    key={`charImage:${char.id}`} 
                                    alt={'competitor'} 
                                    className={classes.modalImage}/>
                            })}
                        </div>
                        <h5>Are you ready to begin?</h5>
                        <br/>
                        <SubmitButton 
                            children={'Yes!'}
                            clicked={() => this.startVotingHandler(this.props.characters.filter(el => !el.isEliminated.check)[0], 
                                                                this.props.characters.filter(el => !el.isEliminated.check)[1])}/>
                    </aside>
                </div> : null}
                <main className={classes.grid}>
                    <section className={classes.imageOne}>
                        <Character players ={this.props.players} character={this.props.characters.filter(el => !el.isEliminated.check)[0]}/>
                    </section>
                    <section className={classes.imageTwo}>
                        <Character players={this.props.players} character={this.props.characters.filter(el => !el.isEliminated.check)[1]}/>
                    </section>
                    <footer>
                        <Link 
                            to={this.props.characters.filter(el => !el.isEliminated.check).length > 2 ? urls.FINALS_PAGE : urls.WINNER_PAGE}
                            onClick = {() => this.submitVotesHandler(this.props.characters.filter(el => !el.isEliminated.check)[0], 
                                                                    this.props.characters.filter(el => !el.isEliminated.check)[1])}>
                            <SubmitButton children={"Cast your votes"}/>
                        </Link>
                    </footer>
                </main>
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
        onClearModal: () => {
            dispatch({type: actionTypes.RESET_FOR_FINALS})
        },
        onSubmitRatings: (playerOne, playerTwo) => {
            dispatch({type: actionTypes.SUBMIT_CHARACTER_RATINGS, payload:{
                players: [playerOne, playerTwo]
            }});
        },
        onEliminate: () => {
            dispatch({type: actionTypes.REMOVE_LOWEST_SCORE})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinalsPage);