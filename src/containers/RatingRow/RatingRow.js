import React, { Component } from 'react';
import RatingButton from '../../components/RatingButton/RatingButton';
import classes from './RatingRow.css';
import { connect } from 'react-redux';
import { rateCharacter } from '../../constants/actions';

export class RatingRow extends Component {
    state = {
        qualityArray: [ {quality: 'awful', active: false, points: 1}, 
                        {quality: 'poor', active: false, points: 2}, 
                        {quality: 'average', active: false, points: 3}, 
                        {quality: 'good', active: false, points: 4}, 
                        {quality: 'excellent', active: false, points: 5}]
    }

    ratingChoiceHandler = (id) =>{
        const qualityArray = JSON.parse(JSON.stringify(this.state.qualityArray));
        
        qualityArray.forEach(el => {
            const i = qualityArray.indexOf(el);
            if(i <= id){
                el.active = true;
            } else {
                el.active = false;
            }
        })
        this.setState({
            qualityArray: qualityArray
        })
    }

    ratingRowManager = (id, points, rowId, character) =>{
        this.ratingChoiceHandler(id);
        this.props.onRate(points, rowId, character);
    }

    render(){
        return(
            <div id={this.props.id}
                className={this.props.players === 3 ? classes.flexContainer__row3Players : classes.flexContainer__row4Players}>
                    {this.state.qualityArray.map((el, i) => {
                        const qualityArray = [...this.state.qualityArray]
                        let isChosen = '';
                        if(qualityArray[i].active){
                            isChosen = 'active';
                        }
                        return(
                            <RatingButton children={i + 1}
                                quality={classes[el.quality]}
                                chosen={classes[isChosen]}
                                key={i}
                                clicked={() => this.ratingRowManager(i, el.points, this.props.rowId, this.props.character)}
                                />
                        );
                    })}
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        players: state.players
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRate: (points, rowId, character) => dispatch(rateCharacter(points, rowId, character))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingRow);