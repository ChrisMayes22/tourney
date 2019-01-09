import images from '../../assets/images';
import React, { Component } from 'react';
import classes from './Character.css';
import RatingButton from '../RatingButton/RatingButton';

class Character extends Component {

    state = {
        qualityArray: [ {quality: 'awful', active: false}, 
                        {quality: 'poor', active: false}, 
                        {quality: 'average', active: false}, 
                        {quality: 'good', active: false}, 
                        {quality: 'excellent', active: false}]
    }

    ratingChoiceHandler = (id) =>{
        const qualityArray = JSON.parse(JSON.stringify(this.state.qualityArray));

        console.log(qualityArray[0] === this.state.qualityArray[0]);
        
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

    render() {
        return(
            <section className={classes.flexContainer__col}>
                <img 
                    src={images[this.props.number]} 
                    className={classes.characterPortrait}
                />
                <div className={classes.flexContainer__row}>
                    {this.state.qualityArray.map(el => {
                        const currentIndex = this.state.qualityArray.indexOf(el);
                        let isChosen = '';
                        if(this.state.qualityArray[currentIndex].active){
                            isChosen = 'active';
                        }
                        return(
                            <RatingButton children={currentIndex + 1}
                                quality={classes[el.quality]}
                                chosen={classes[isChosen]}
                                id={currentIndex}
                                key={currentIndex}
                                clicked={() => this.ratingChoiceHandler(currentIndex)}
                                />
                        );
                    })}
                </div>
            </section>
        );
    }
}

export default Character;