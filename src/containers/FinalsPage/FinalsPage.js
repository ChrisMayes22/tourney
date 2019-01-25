import React, {Component } from 'react';
import Character from '../../components/Character/Character';
import classes from './FinalsPage.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { connect } from 'react-redux';
import { resetForFinals, removeLowestScore, chooseWinner } from '../../constants/actions';
import Modal from '../../components/Modal/Modal'

export class FinalsPage extends Component {

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

    render () {

        return(
            <React.Fragment>
                {this.state.modal ? <Modal sizing={classes.modalSizing}>
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
                    </Modal> : null}
                <main className={classes.grid}>
                    <section className={classes.imageOne}>
                        <Character 
                            players ={this.props.players} 
                            finals={true}
                            character={this.props.characters.filter(el => !el.isEliminated.check)[0]} 
                            characters={this.props.characters.filter(el => !el.isEliminated.check)} 
                            clicked={() => this.submitWinnerHandler(this.props.characters.filter(el => !el.isEliminated.check)[1])}
                            id={'first-char'}/>
                    </section>
                    <section className={classes.imageTwo}>
                        <Character 
                            players={this.props.players} 
                            finals={true}
                            character={this.props.characters.filter(el => !el.isEliminated.check)[1]}
                            characters={this.props.characters.filter(el => !el.isEliminated.check)} 
                            clicked={() => this.submitWinnerHandler(this.props.characters.filter(el => !el.isEliminated.check)[0])}
                            id={'second-char'}/>
                    </section>
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
        onChooseWinner: (character) => dispatch(chooseWinner(character)),
        onClearModal: () => dispatch(resetForFinals()),
        onEliminate: () => dispatch(removeLowestScore())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinalsPage);