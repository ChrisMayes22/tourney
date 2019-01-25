import React, { Component } from 'react';
import RatingButton from '../../components/RatingButton/RatingButton';
import classes from './RatingRow.css';

export class RatingRow extends Component {
    state = {
        qualityArray: [ {quality: 'awful', active: false, points: 1}, 
                        {quality: 'poor', active: false, points: 2}, 
                        {quality: 'average', active: false, points: 3}, 
                        {quality: 'good', active: false, points: 4}, 
                        {quality: 'excellent', active: false, points: 5}]
    }

    ratingChoiceHandler = (id) =>{
        const qualityArrCopy = [{...this.state.qualityArray[0]},
            {...this.state.qualityArray[1]},
            {...this.state.qualityArray[2]},
            {...this.state.qualityArray[3]},
            {...this.state.qualityArray[4]}];
        
        const transformedCopy = qualityArrCopy.map((el, i) => {
            if(i <= id){
                el.active = true;
                return el;
            } else {
                el.active = false;
                return el;
            }
        })

        this.setState({
            qualityArray: transformedCopy
        })
    }

    ratingRowManager = (id, points, rowId, character) =>{
        this.ratingChoiceHandler(id);
        this.props.clicked(points, rowId, character);
    }

    render(){
        return(
            <div id={this.props.id}
                className={this.props.players === 3 ? classes.flexContainer__row3Players : classes.flexContainer__row4Players}>
                    {this.state.qualityArray.map((el, i) => {
                        let isChosen = '';
                        if(this.state.qualityArray[i].active){
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



export default RatingRow;