import React, { Component } from 'react';
import classes from './VotingPage.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { submitCharacterRatings, rateCharacter, chooseWinner, resetForFinals, removeLowestScore } from '../../constants/actions';
import VotingLayout from '../../components/VotingLayout/VotingLayout';
import PrelimVotingContent from '../../components/PrelimVotingContent/PrelimVotingContent';
import FinalsVotingContent from '../../components/FinalsVotingContent/FinalsVotingContent';
import Modal from '../../components/Modal/Modal';
import * as urls from '../../constants/urls';

export class VotingPage extends Component {

    state = {
        modal: true,
    }

    toggleModalHandler = () =>{
        const displayToggle = !this.state.modal;
        this.setState({
            modal: displayToggle
        })
    }

    startVotingHandler = () => {
        this.toggleModalHandler();
        this.props.onClearModal();
    }

    submitWinnerHandler = (player) => {
        this.props.onChooseWinner(player);
        this.toggleModalHandler();
    }

    playersArray= this.props.characters.filter(char => !char.hadTurn)

    render () {

        return(
            <React.Fragment>
                {!(this.state.modal * this.props.finals) ? null :
                    <Modal sizing={classes.modalSizing}>
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
                            clicked={() => this.startVotingHandler()}/>      
                    </Modal>}

                <VotingLayout
                    finals={this.props.finals ? true : false}
                    players={this.props.players}>
                    {this.props.finals ?
                        <FinalsVotingContent
                            characters={this.props.characters}
                            players={this.props.players}
                            clicked={this.submitWinnerHandler}/> :
                        <PrelimVotingContent
                            characters={this.props.characters}
                            players={this.props.players}
                            clicked={this.props.onRate}/>}
                </VotingLayout>

                {this.props.finals ? null :
                    <footer>
                        <Link 
                            onClick={() => this.props.onSubmitRatings(this.playersArray)}
                            to={urls.UPLOAD_PAGE}>
                                <SubmitButton children={"Submit"}/>
                        </Link>
                    </footer>}
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        characters: state.characters,
        players: state.players,
        finals: state.finals
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onChooseWinner: (character) => dispatch(chooseWinner(character)),
        onClearModal: () => dispatch(resetForFinals()),
        onEliminate: () => dispatch(removeLowestScore()),
        onSubmitRatings: (playersArray) => dispatch(submitCharacterRatings(playersArray)),
        onRate: (points, rowId, character) => dispatch(rateCharacter(points, rowId, character))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VotingPage);