import React, { Component } from 'react';
import classes from './Winner.css';
import { connect } from 'react-redux';

export class Winner extends Component{

    render(){
        return(
            <React.Fragment>
                <main className={classes.flexContainer__col}>
                    <h1 className={classes.eliminationHeader}>WINNER!!</h1>
                    <div className={classes.mainImageContainer}>
                        {this.props.characters.filter(char => !char.isEliminated.check).map(function(char){
                            return(<img src={char.imageUrl} key={char.id} className={classes.mainImg} alt="the winner!"/>)
                        })}
                    </div>
                </main>
                <section className={classes.grid}>
                    <h5 className={classes.otherLosersHeader}>~ The Losers ~</h5>
                    {this.props.characters.filter(char => char.isEliminated.check).map(char => 
                        <img src={char.imageUrl} key={char.id} className={classes.refImg} alt="a losing competitor"/>)}
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