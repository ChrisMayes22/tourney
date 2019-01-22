import React, { Component } from 'react';
import classes from './Home.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { setPlayers } from '../../constants/actions';
import * as urls from '../../constants/urls';

export class Home extends Component {

    render(){
        return(
            <div className={classes.background}>
                <nav className={classes.ui}>
                    <h3>How many judges are joining us...?</h3>
                    <input 
                        type="number"
                        onChange={(event) => this.props.onSetPlayers(Number(event.target.value))}></input>
                        {(this.props.players === 3 || this.props.players === 4)  ? 
                            <Link to={urls.UPLOAD_PAGE} id='uploadLink'>
                                <SubmitButton children={"Let's begin!"} id="beginButton"/>
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
        onSetPlayers: (num) => dispatch(setPlayers(num))
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Home);