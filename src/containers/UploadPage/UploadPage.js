import React, { Component } from 'react';
import classes from './UploadPage.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {initializeCharacter, removeCharacter, removeLowestScore} from '../../constants/actions'
import * as urls from '../../constants/urls';

export class UploadPage extends Component {

    state = {
        imageUrl: '',
        modalDisplayToggle: true
    }

    imageUrlHandler = (event) => {
        const imageUrl = event.target.value;
        this.setState({
            imageUrl: imageUrl
        })
    }

    modalDisplay = (this.props.characters.findIndex(character => character.hadTurn)+1);

    modalDisplayHandler = () => {
        const toggled = !this.state.modalDisplayToggle;
        this.setState({
            modalDisplayToggle: toggled
        })
    }
    
    render(){

        return(
            <React.Fragment>
                {(this.modalDisplay * this.state.modalDisplayToggle)? <div className={classes.modalBackground} id='modal'>
                        <aside className={classes.modal} >
                        <h5 className= {classes.modalHeader}>
                            DO YOU WANT TO ADD ANOTHER ROUND OF CHARACTERS... <br/>
                            ...OR MOVE ON TO THE SORTING?
                        </h5>
                            <br/>
                            <SubmitButton 
                                children={'Add another!'}
                                clicked={this.modalDisplayHandler}/>
                            <Link to={urls.ELIMINATION_PAGE} onClick={this.props.onEliminate}>
                                <SubmitButton children={'Move on to the finals.'}/>
                            </Link>
                        </aside>
                    </div> : null}

                <div className={classes.flexContainer__col}>
                    <section className={classes.inputContent}>
                        <h3>{`Upload ${this.props.players} images that will be competing, (using a url)...<br/>
                        ...Or begin the game.`}</h3>
                        <input 
                            type="text"
                            onChange={this.imageUrlHandler}
                            default="image-url">
                        </input>
                            <SubmitButton 
                                children={"Upload"}
                                id={"uploadButton"}
                                clicked={() => this.props.onUpload(this.state.imageUrl,
                                                        `url=${String(this.state.imageUrl)}${Math.floor(Math.random()*1000000)}`)}
                            />
                        <Link 
                            to={this.props.characters.filter(el => !el.hadTurn).length === this.props.players ? urls.VOTING_PAGE : urls.NOT_ENOUGH_CHARACTERS} 
                            id="beginGameButton">
                                <SubmitButton children={"Begin Game"}/>
                        </Link>
                    </section>
                    <section className={classes.grid} id='grid'>
                        <header className={classes.imageHeader}>
                            <h1>Uploaded Images</h1>
                            <h5>Click Image to Remove</h5>
                        </header>
                        {this.props.characters.map(el =>{
                            return (
                                <div className={classes.imageContainer} key={el.id}>
                                    <img 
                                        className={classes.refImg} 
                                        src={el.imageUrl} 
                                        onClick={() => this.props.onRemove(el.id)}
                                        alt={"One of the competing items"}/>
                                </div>
                            )
                        })}
                    </section>
                </div>
            </React.Fragment>
        )
    } 
}

const mapDispatchToProps = dispatch => {
    return {
        onUpload: (imageUrl, id) => dispatch(initializeCharacter(imageUrl, id)),
        onRemove: (id) => dispatch(removeCharacter(id)),
        onEliminate: () => dispatch(removeLowestScore())
    }
}

const mapStateToProps = state => {
    return {
        characters: state.characters,
        players: state.players
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);