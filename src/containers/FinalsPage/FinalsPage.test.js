import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { shallow } from 'enzyme';

import { FinalsPage } from './FinalsPage';
import * as urls from '../../constants/urls';

let props = null;
let wrapper = null;
let component = null;

describe('When unconnected FinalsPage first renders', function(){
    beforeEach(function(){
        props = {characters: [{
            imageUrl: `foo$Image1`,
            roundRatings: {
                rowOne: {rowId: `foo$id1-row-one`, points: 5},
                rowTwo: {rowId: `foo$id1-row-two`, points: 5},
                rowThree: {rowId: `foo$id1-row-three`, points: 5},
                rowFour: {rowId: `foo$id1-row-four`, points: 5}
            },
            points: 20,
            hadTurn: false,
            isEliminated: {check: false, whenEliminated: null},
            id: 'foo$id1'
          },
          {
            imageUrl: `foo$Image2`,
            roundRatings: {
                rowOne: {rowId: `foo$id2-row-one`, points: 1},
                rowTwo: {rowId: `foo$id2-row-two`, points: 1},
                rowThree: {rowId: `foo$id2-row-three`, points: 1},
                rowFour: {rowId: `foo$id2-row-four`, points: 1}
            },
            points: 4,
            hadTurn: false,
            isEliminated: {check: false, whenEliminated: null},
            id: 'foo$id2'
          },
          {
            imageUrl: `foo$Image3`,
            roundRatings: {
                rowOne: {rowId: `foo$id3-row-one`, points: 2},
                rowTwo: {rowId: `foo$id3-row-two`, points: 2},
                rowThree: {rowId: `foo$id3-row-three`, points: 2},
                rowFour: {rowId: `foo$id3-row-four`, points: 2}
            },
            points: 8,
            hadTurn: false,
            isEliminated: {check: false, whenEliminated: null},
            id: 'foo$id3'
          }],
          players: 3
        }
        
        wrapper = shallow(<FinalsPage {...props}/>)
        component = wrapper.instance();
    })
    test('FinalsPage renders as expected', function(){
        expect(wrapper).toMatchSnapshot();
    })
    describe('When state initializes', function(){
        test('state.modal is true', function(){
            expect(component.state.modal).toBe(true);
        })
    })
    describe('When character map in modal is initialized', function(){
        test('The number of characters rendered === number of non-eliminated characters', function(){
            expect(wrapper.find('[alt="competitor"]')).toHaveLength(3);
        });
        test('eliminated characters should not be rendered in modal', function(){
            props = {characters: [{
                    imageUrl: `foo$Image1`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id1-row-one`, points: 5},
                        rowTwo: {rowId: `foo$id1-row-two`, points: 5},
                        rowThree: {rowId: `foo$id1-row-three`, points: 5},
                        rowFour: {rowId: `foo$id1-row-four`, points: 5}
                    },
                    points: 20,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id1'
                },
                {
                    imageUrl: `foo$Image2`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id2-row-one`, points: 1},
                        rowTwo: {rowId: `foo$id2-row-two`, points: 1},
                        rowThree: {rowId: `foo$id2-row-three`, points: 1},
                        rowFour: {rowId: `foo$id2-row-four`, points: 1}
                    },
                    points: 4,
                    hadTurn: false,
                    isEliminated: {check: true, whenEliminated: 0},
                    id: 'foo$id2'
                }],
                players: 3
            };
            wrapper = shallow(<FinalsPage {...props}/>)
            component = wrapper.instance();

            expect(wrapper.exists('[src="foo$Image2"]')).toBe(false);
            expect(wrapper.exists('[src="foo$Image1"]')).toBe(true);
            expect(wrapper.find('[alt="competitor"]')).toHaveLength(1);
        })
    })
    describe('When the .grid container is rendered', function(){
        test('The first character rendered is the last non-eliminated character in props.characters', function(){
            expect(wrapper.find('#first-char').prop('character')).toEqual(props.characters[2]);
        })
        test('The second character rendered is the second to last non-eliminated character in props.characters', function(){
            expect(wrapper.find('#second-char').prop('character')).toEqual(props.characters[1]);
        })
    })
    describe('When Links are rendered', function(){
        test('Given that there are more than two non-eliminated characters, to attribute is urls.FINALS_PAGE', function(){
            expect(wrapper.exists(`[to="${urls.FINALS_PAGE}"]`)).toBe(true);
            expect(wrapper.exists(`[to="${urls.WINNERS_PAGE}"]`)).toBe(false);
        })
        test('Given that there are exactly two non-eliminated characters, to attribute is urls.WINNER_PAGE', function(){
            props =  {characters: [{
                imageUrl: `foo$Image1`,
                roundRatings: {
                    rowOne: {rowId: `foo$id1-row-one`, points: 5},
                    rowTwo: {rowId: `foo$id1-row-two`, points: 5},
                    rowThree: {rowId: `foo$id1-row-three`, points: 5},
                    rowFour: {rowId: `foo$id1-row-four`, points: 5}
                },
                points: 20,
                hadTurn: false,
                isEliminated: {check: false, whenEliminated: null},
                id: 'foo$id1'
            },
            {
                imageUrl: `foo$Image2`,
                roundRatings: {
                    rowOne: {rowId: `foo$id2-row-one`, points: 1},
                    rowTwo: {rowId: `foo$id2-row-two`, points: 1},
                    rowThree: {rowId: `foo$id2-row-three`, points: 1},
                    rowFour: {rowId: `foo$id2-row-four`, points: 1}
                },
                points: 4,
                hadTurn: false,
                isEliminated: {check: false, whenEliminated: null},
                id: 'foo$id2'
            }],
            players: 3
        };
        wrapper = shallow(<FinalsPage {...props}/>)

        expect(wrapper.exists(`[to="${urls.WINNER_PAGE}"]`)).toBe(true);
        expect(wrapper.exists(`[to="${urls.FINALS_PAGE}"]`)).toBe(false);

        })
    })
})

describe('When unconnected component methods are invoked', function(){
    beforeEach(function(){
        props = {characters: [{
            imageUrl: `foo$Image`,
            roundRatings: {
                rowOne: {rowId: `foo$id1-row-one`, points: 5},
                rowTwo: {rowId: `foo$id1-row-two`, points: 5},
                rowThree: {rowId: `foo$id1-row-three`, points: 5},
                rowFour: {rowId: `foo$id1-row-four`, points: 5}
            },
            points: 20,
            hadTurn: false,
            isEliminated: {check: false, whenEliminated: null},
            id: 'foo$id1'
          },
          {
            imageUrl: `foo$Image`,
            roundRatings: {
                rowOne: {rowId: `foo$id2-row-one`, points: 1},
                rowTwo: {rowId: `foo$id2-row-two`, points: 1},
                rowThree: {rowId: `foo$id2-row-three`, points: 1},
                rowFour: {rowId: `foo$id2-row-four`, points: 1}
            },
            points: 4,
            hadTurn: false,
            isEliminated: {check: false, whenEliminated: null},
            id: 'foo$id2'
          },
          {
            imageUrl: `foo$Image`,
            roundRatings: {
                rowOne: {rowId: `foo$id3-row-one`, points: 2},
                rowTwo: {rowId: `foo$id3-row-two`, points: 2},
                rowThree: {rowId: `foo$id3-row-three`, points: 2},
                rowFour: {rowId: `foo$id3-row-four`, points: 2}
            },
            points: 8,
            hadTurn: false,
            isEliminated: {check: false, whenEliminated: null},
            id: 'foo$id3'
          }],
          players: 3
        }
    
        wrapper = shallow(<FinalsPage {...props}/>)
        component = wrapper.instance();
    })
    
    test('Given state.modal === true, when toggleModalHandler is invoked, then state.modal === false', function(){
        expect(component.state.modal).toBe(true);
        component.toggleModalHandler();
        expect(component.state.modal).toBe(false);
    })
    test('Given state.modal === false, when toggleModalHandler is invoked, then state.modal === true', function(){
        wrapper.setState({modal: false});
        expect(component.state.modal).toBe(false);
        component.toggleModalHandler();
        expect(component.state.modal).toBe(true);
    })
})