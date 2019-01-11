import React, { Component } from 'react';
import RatingButton from '../../components/RatingButton/RatingButton';
import classes from './RatingRow.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../reducers/actions';

class RatingRow extends Component {
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
            const currentIndex = qualityArray.indexOf(el);
            if(currentIndex <= id){
                el.active = true;
            } else {
                el.active = false;
            }
        })
        this.setState({
            qualityArray: qualityArray
        })
    }

    ratingRowManager = (id, points, rowId) =>{
        this.ratingChoiceHandler(id);
        this.props.onRate(points, rowId);
    }

    render(){
        return(
            <div className={classes.flexContainer__row}>
                    {this.state.qualityArray.map(el => {
                        const qualityArray = [...this.state.qualityArray]
                        const currentIndex = qualityArray.indexOf(el);
                        let isChosen = '';
                        if(qualityArray[currentIndex].active){
                            isChosen = 'active';
                        }
                        return(
                            <RatingButton children={currentIndex + 1}
                                quality={classes[el.quality]}
                                chosen={classes[isChosen]}
                                key={currentIndex}
                                clicked={() => this.ratingRowManager(currentIndex, el.points, this.props.rowId)}
                                />
                        );
                    })}
                </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRate: (points, rowId) => {
            dispatch({type: actionTypes.RATE_CHARACTER, payload: {points: points, rowId: rowId}})
        }
    }
}

export default connect(null, mapDispatchToProps)(RatingRow);