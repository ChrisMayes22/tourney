import React, { Component } from 'react';
import classes from './Winner.css';
import { connect } from 'react-redux';
import Loser from '../../components/Loser/Loser';

export class Winner extends Component{

    render(){
        return(
            <React.Fragment>
                <main className={classes.flexContainer__col}>
                    <h1 className={classes.eliminationHeader}>WINNER!!</h1>
                        {this.props.characters.filter(char => !char.isEliminated.check).map(function(char){
                            return(<img src={char.imageUrl} key={char.id} className={classes.mainImg} alt="the winner!"/>)
                        })}
                </main>
                <section className={classes.grid}>
                    <h5 className={classes.otherLosersHeader}>~ The Losers ~</h5>
                    {this.props.characters.filter(char => char.isEliminated.check).map(char => 
                        <Loser imageUrl={char.imageUrl} key={char.id} />)}
                </section>
            </React.Fragment>
        );
    }
}

let mapStateToProps = state => {
    return {
        characters: state.characters
    }
};

export default connect(mapStateToProps, null)(Winner);