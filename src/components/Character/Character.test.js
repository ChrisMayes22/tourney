import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { shallow } from 'enzyme';

import { Character } from './Character';
import * as urls from '../../constants/urls';

let props= null;
let wrapper = null;

describe('When Character first renders', function(){
    beforeEach(function(){
        props = {
            players: 3,
            character: {
                imageUrl: `foo$Image1`,
                roundRatings: {
                    rowOne: {rowId: `foo$id1-row-1`, points: 5},
                    rowTwo: {rowId: `foo$id1-row-2`, points: 5},
                    rowThree: {rowId: `foo$id1-row-3`, points: 5},
                    rowFour: {rowId: `foo$id1-row-4`, points: 5}
                },
                points: 20,
                hadTurn: false,
                isEliminated: {check: false, whenEliminated: null},
                id: 'foo$id1'
              },
            characters: [{
                imageUrl: `foo$Image1`,
                roundRatings: {
                    rowOne: {rowId: `foo$id1-row-1`, points: 5},
                    rowTwo: {rowId: `foo$id1-row-2`, points: 5},
                    rowThree: {rowId: `foo$id1-row-3`, points: 5},
                    rowFour: {rowId: `foo$id1-row-4`, points: 5}
                },
                points: 20,
                hadTurn: false,
                isEliminated: {check: false, whenEliminated: null},
                id: 'foo$id1'
              },
              {
                imageUrl: `foo$Image2`,
                roundRatings: {
                    rowOne: {rowId: `foo$id2-row-1`, points: 5},
                    rowTwo: {rowId: `foo$id2-row-2`, points: 5},
                    rowThree: {rowId: `foo$id2-row-3`, points: 5},
                    rowFour: {rowId: `foo$id2-row-4`, points: 5}
                },
                points: 20,
                hadTurn: false,
                isEliminated: {check: false, whenEliminated: null},
                id: 'foo$id2'
              }],
              finals: true,
              
        }

        wrapper = shallow(<Character {...props}/>)
    })

    test('Character renders as expected', function(){
        expect(wrapper).toMatchSnapshot();
    })
    describe('Link renders as expected', function(){
        test('Given that props.finals === true, exactly one Link renders', function(){
            expect(wrapper.find('Link')).toHaveLength(1);
        })
        test('Given that props.finals === false, no Links render', function(){
            props = {...props, finals: false}
            wrapper = shallow(<Character {...props}/>)
            expect(wrapper.find('Link')).toHaveLength(0);
        })
        test('Given a Link renders and props.characters.length === 2, to === urls.WINNER_PAGE', function(){
            expect(wrapper.exists(`[to="${urls.FINALS_PAGE}"]`)).toBe(false);
            expect(wrapper.exists(`[to="${urls.WINNER_PAGE}"]`)).toBe(true);
        })
        test('Given a Link renders and props.characters.length > 2, to === urls.FINALS_PAGE', function(){
            props={ ...props,
                characters: [{
                    imageUrl: `foo$Image1`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id1-row-1`, points: 5},
                        rowTwo: {rowId: `foo$id1-row-2`, points: 5},
                        rowThree: {rowId: `foo$id1-row-3`, points: 5},
                        rowFour: {rowId: `foo$id1-row-4`, points: 5}
                    },
                    points: 20,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id1'
                  },
                  {
                    imageUrl: `foo$Image2`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id2-row-1`, points: 5},
                        rowTwo: {rowId: `foo$id2-row-2`, points: 5},
                        rowThree: {rowId: `foo$id2-row-3`, points: 5},
                        rowFour: {rowId: `foo$id2-row-4`, points: 5}
                    },
                    points: 20,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id2'
                  }, 
                  {
                    imageUrl: `foo$Image3`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id3-row-1`, points: 5},
                        rowTwo: {rowId: `foo$id3-row-2`, points: 5},
                        rowThree: {rowId: `foo$id3-row-3`, points: 5},
                        rowFour: {rowId: `foo$id3-row-4`, points: 5}
                    },
                    points: 20,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id3'
                  }]
                }

                  wrapper = shallow(<Character {...props}/>)

            expect(wrapper.exists(`[to="${urls.FINALS_PAGE}"]`)).toBe(true);
            expect(wrapper.exists(`[to="${urls.WINNER_PAGE}"]`)).toBe(false);
        })
    })
    describe('RatingRows render as expected', function(){
        beforeEach(function(){
            props = {...props, finals: false}
            wrapper = shallow(<Character {...props}/>)
        })
        test('Given props.finals === true, RatingRows do not render', function(){
            props = {...props, finals: true}
            wrapper = shallow(<Character {...props}/>)
            
            expect(wrapper.exists('[id*="row"]')).toBe(false);
        })
        test('Given props.finals === false, RatingRows render', function(){
            expect(wrapper.exists('[id*="row"]')).toBe(true)
        })
        test('Given that RatingRows render and that props.players === 4, there should be 4 RatingRows rendered', function(){
            props = {...props, players: 4}
            wrapper = shallow(<Character {...props}/>)
            expect(wrapper.find('[id*="row"]')).toHaveLength(4)
        })
        test('Given that RatingRows render and that props.players === 3, there should be 4 RatingRows rendered', function(){
            props = {...props, players: 3}
            wrapper = shallow(<Character {...props}/>)
            expect(wrapper.find('[id*="row"]')).toHaveLength(3)
        })
        test('RatingRows ids render as expected', function(){
            props = {...props, players: 4}
            wrapper = shallow(<Character {...props}/>)

            expect(wrapper.exists(`[id="id:${props.character.id}-row-0"]`)).toBe(false)
            expect(wrapper.exists(`[id="id:${props.character.id}-row-1"]`)).toBe(true)
            expect(wrapper.exists(`[id="id:${props.character.id}-row-2"]`)).toBe(true)
            expect(wrapper.exists(`[id="id:${props.character.id}-row-3"]`)).toBe(true)
            expect(wrapper.exists(`[id="id:${props.character.id}-row-4"]`)).toBe(true)
            expect(wrapper.exists(`[id="id:${props.character.id}-row-5"]`)).toBe(false)

            wrapper.setProps({...props, players: 3})

            expect(wrapper.exists(`[id="id:${props.character.id}-row-0"]`)).toBe(false)
            expect(wrapper.exists(`[id="id:${props.character.id}-row-1"]`)).toBe(true)
            expect(wrapper.exists(`[id="id:${props.character.id}-row-2"]`)).toBe(true)
            expect(wrapper.exists(`[id="id:${props.character.id}-row-3"]`)).toBe(true)
            expect(wrapper.exists(`[id="id:${props.character.id}-row-4"]`)).toBe(false)
        })
        
    })
    
})