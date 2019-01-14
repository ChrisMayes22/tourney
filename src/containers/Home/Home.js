import React, { Component } from 'react';
import classes from './Home.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import * as actionTypes from '../../reducers/actions';

class Home extends Component {

    render(){
        return(
            <div className={classes.background}>
                <nav className={classes.ui}>
                    <h3>How many judges are joining us...?</h3>
                    <input 
                        type="number"
                        onChange={(event) => this.props.onSetPlayers(event.target.value)}></input>
                        {(this.props.players == 3 || this.props.players == 4)  ? 
                            <Link to="/upload-page">
                                <SubmitButton children={"Let's begin!"}/>
                            </Link> : 
                            <h3>This game is designed for THREE or FOUR players</h3>}
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        players: state.players
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetPlayers: (num) => {
            console.log('Set Players Called')
            dispatch({type: actionTypes.SET_PLAYERS, number: num})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);