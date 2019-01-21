import React, {Component } from 'react';
import Character from '../../components/Character/Character';
import classes from './FinalsPage.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetForFinals, submitCharacterRatings, removeLowestScore } from '../../constants/actions';
import * as urls from '../../constants/urls';

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

    startVotingHandler = (playerOne, playerTwo) => {
        this.toggleModalHandler();
        this.props.onClearModal(playerOne, playerTwo);
    }

    submitVotesHandler = (playerOne, playerTwo) => {
        this.props.onSubmitRatings(playerOne, playerTwo);
        this.props.onEliminate();
        this.props.onClearModal();
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
                            clicked={() => this.startVotingHandler([...this.props.characters].filter(el => !el.isEliminated.check).reverse()[0], 
                                                                        [...this.props.characters].filter(el => !el.isEliminated.check).reverse()[1])}/>      
                    </aside>
                </div> : null}
                <main className={classes.grid}>
                    <section className={classes.imageOne}>
                        <Character 
                            players ={this.props.players} 
                            character={[...this.props.characters].filter(el => !el.isEliminated.check).reverse()[0]} 
                            id={'first-char'}/>
                    </section>
                    <section className={classes.imageTwo}>
                        <Character 
                        players={this.props.players} 
                        character={[...this.props.characters].filter(el => !el.isEliminated.check).reverse()[1]} 
                        id={'second-char'}/>
                    </section>
                    <footer>
                        <Link 
                            to={this.props.characters.filter(el => !el.isEliminated.check).length === 2 ? urls.WINNER_PAGE : urls.FINALS_PAGE}
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
        onClearModal: () => dispatch(resetForFinals()),
        onSubmitRatings: (playerOne, playerTwo) => dispatch(submitCharacterRatings([playerOne, playerTwo])),
        onEliminate: () => dispatch(removeLowestScore())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinalsPage);