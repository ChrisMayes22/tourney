import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { shallow } from 'enzyme';

import { CharacterArray } from './CharacterArray';
import * as loserSettings from './LoserSettings';

let props;
let wrapper;
let component;

describe('When CharacterArray renders', function(){
    beforeEach(function(){
        props = {characters: [{
                        imageUrl: `foo$Image1`,
                        roundRatings: {
                            rowOne: {rowId: `foo$id1-row-1`, points: 5},
                            rowTwo: {rowId: `foo$id1-row-2`, points: 5},
                            rowThree: {rowId: `foo$id1-row-3`, points: 5},
                            rowFour: {rowId: `foo$id1-row-4`, points: 5}
                        },
                        points: 20,
                        hadTurn: false,
                        isEliminated: {check: true, whenEliminated: 2},
                        id: 'foo$id1'
                    },
                    {
                        imageUrl: `foo$Image2`,
                        roundRatings: {
                            rowOne: {rowId: `foo$id2-row-1`, points: 1},
                            rowTwo: {rowId: `foo$id2-row-2`, points: 1},
                            rowThree: {rowId: `foo$id2-row-3`, points: 1},
                            rowFour: {rowId: `foo$id2-row-4`, points: 1}
                        },
                        points: 4,
                        hadTurn: false,
                        isEliminated: {check: true, whenEliminated: 0},
                        id: 'foo$id2'
                    },
                    {
                        imageUrl: `foo$Image3`,
                        roundRatings: {
                            rowOne: {rowId: `foo$id3-row-1`, points: 2},
                            rowTwo: {rowId: `foo$id3-row-2`, points: 2},
                            rowThree: {rowId: `foo$id3-row-3`, points: 2},
                            rowFour: {rowId: `foo$id3-row-4`, points: 2}
                        },
                        points: 8,
                        hadTurn: false,
                        isEliminated: {check: false, whenEliminated: null},
                        id: 'foo$id3'
                    },
                    {
                        imageUrl: `foo$Image1`,
                        roundRatings: {
                            rowOne: {rowId: `foo$id1-row-1`, points: 1},
                            rowTwo: {rowId: `foo$id1-row-2`, points: 1},
                            rowThree: {rowId: `foo$id1-row-3`, points: 1},
                            rowFour: {rowId: `foo$id1-row-4`, points: 3}
                        },
                        points: 6,
                        hadTurn: false,
                        isEliminated: {check: true, whenEliminated: 1},
                        id: 'foo$id4'
                    }
                ],
                    loserSettings: null
        }
        wrapper = shallow(<CharacterArray {...props}/>);
    })
    test('Given props.losers === `ISOLATE_MOST_RECENT_LOSER`, then the character with the greatest isEliminated.whenEliminated prop renders', function(){
        props = {...props, loserSettings: loserSettings.ISOLATE_MOST_RECENT_LOSER};
        wrapper = shallow(<CharacterArray {...props}/>);

        expect(wrapper.exists('[id="foo$id1"]')).toBe(true);
        expect(wrapper.exists('[id="foo$id2"]')).toBe(false);
        expect(wrapper.exists('[id="foo$id3"]')).toBe(false);
        expect(wrapper.exists('[id="foo$id4"]')).toBe(false);
        expect(wrapper.find('[id]')).toHaveLength(1);
    })
    test('Given props.losers === `EXLCUDE_MOST_RECENT_LOSER`, then the character with the greatest isEliminated.whenEliminated prop renders', function(){
        props = {...props, loserSettings: loserSettings.EXCLUDE_MOST_RECENT_LOSER};
        wrapper = shallow(<CharacterArray {...props}/>);

        expect(wrapper.exists('[id="foo$id1"]')).toBe(false);
        expect(wrapper.exists('[id="foo$id2"]')).toBe(true);
        expect(wrapper.exists('[id="foo$id3"]')).toBe(false);
        expect(wrapper.exists('[id="foo$id4"]')).toBe(true);
        expect(wrapper.find('[id]')).toHaveLength(2);
    })
    test('Given props.losers === `DISPLAY_ALL_LOSERS`, then all eliminated characters will render', function(){
        props = {...props, loserSettings: loserSettings.DISPLAY_ALL_LOSERS};
        wrapper = shallow(<CharacterArray {...props}/>);

        expect(wrapper.exists('[id="foo$id1"]')).toBe(true);
        expect(wrapper.exists('[id="foo$id2"]')).toBe(true);
        expect(wrapper.exists('[id="foo$id3"]')).toBe(false);
        expect(wrapper.exists('[id="foo$id4"]')).toBe(true);
        expect(wrapper.find('[id]')).toHaveLength(3);
    })
    test('Given props.losers is a falsey value, then only non-eliminated characters will render', function(){

        expect(wrapper.exists('[id="foo$id1"]')).toBe(false);
        expect(wrapper.exists('[id="foo$id2"]')).toBe(false);
        expect(wrapper.exists('[id="foo$id3"]')).toBe(true);
        expect(wrapper.exists('[id="foo$id4"]')).toBe(false);
        expect(wrapper.find('[id]')).toHaveLength(1);
    })
})