import React, {Component } from 'react';
import Character from '../../components/Character/Character';
import classes from './VotingPage.css';
import SubmitButton from '../../components/SubmitButton/SubmitButton';

class VotingPage extends Component {
    render () {

        return(
            <main className={classes.grid}>
                <section className={classes.imageOne}><Character number={0}/></section>
                <section className={classes.imageTwo}><Character number={1}/></section>
                <section className={classes.imageThree}><Character number={4}/></section>
                <footer><SubmitButton/></footer>
            </main>
        );
    }
}

export default VotingPage;