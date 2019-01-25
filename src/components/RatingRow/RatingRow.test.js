import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { shallow } from 'enzyme';

import { RatingRow } from './RatingRow';

let props = null;
let defaultState = null;

describe('When unconnected component first renders', function(){
  beforeEach(function(){
    props = {
      players: 4,
      character: {
        id: 'foo$id3'
      }
    }
  
    defaultState = {
      qualityArray: [ {quality: 'awful', active: false, points: 1}, 
                      {quality: 'poor', active: false, points: 2}, 
                      {quality: 'average', active: false, points: 3}, 
                      {quality: 'good', active: false, points: 4}, 
                      {quality: 'excellent', active: false, points: 5}]
    } 
  })
  

    test('RatingRow renders as expected', () => {
      const wrapper = shallow(<RatingRow {...props}/>);
      expect(wrapper).toMatchSnapshot();
    })
    describe('state initializes as expected', function(){
      test('initializes state w/ expected qualityArray', function(){
          const wrapper = shallow(<RatingRow {...props}/>);
          const component = wrapper.instance()
          expect(component.state).toEqual(defaultState);
      })
    })
})

describe('Unconnected component methods behave as expected', function(){
  props = {
    players: 4,
    character: {
      id: 'foo$id3'
    }
  }

  const initialState = {
    qualityArray: [{quality: 'awful', active: true, points: 1}, 
                    {quality: 'poor', active: false, points: 2}, 
                    {quality: 'average', active: false, points: 3}, 
                    {quality: 'good', active: false, points: 4}, 
                    {quality: 'excellent', active: false, points: 5}]
  } 
  const secondState = {
    qualityArray: [{quality: 'awful', active: true, points: 1}, 
                    {quality: 'poor', active: true, points: 2}, 
                    {quality: 'average', active: true, points: 3}, 
                    {quality: 'good', active: false, points: 4}, 
                    {quality: 'excellent', active: false, points: 5}]
  } 
  const thirdState = {
    qualityArray: [{quality: 'awful', active: true, points: 1}, 
                    {quality: 'poor', active: true, points: 2}, 
                    {quality: 'average', active: true, points: 3}, 
                    {quality: 'good', active: true, points: 4}, 
                    {quality: 'excellent', active: true, points: 5}]
  } 

  test('ratingChoiceHandler method behaves as expected', function(){
    const wrapper = shallow(<RatingRow {...props}/>);
    const component = wrapper.instance();

    component.ratingChoiceHandler(0);
    expect(component.state.qualityArray).toEqual(initialState.qualityArray);
    
    component.ratingChoiceHandler(2);
    expect(component.state.qualityArray).toEqual(secondState.qualityArray);
    
    component.ratingChoiceHandler(4);
    expect(component.state.qualityArray).toEqual(thirdState.qualityArray);
  })
})