import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { shallow } from 'enzyme';

import { EliminationPage } from './EliminationPage';

describe('When unconnected EliminationPage first renders', function(){
  let props = {characters: [{
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
    isEliminated: {check: true, whenEliminated: 0},
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
    isEliminated: {check: true, whenEliminated: 1},
    id: 'foo$id3'
  },
  {
    imageUrl: `foo$Image`,
    roundRatings: {
        rowOne: {rowId: `foo$id3-row-one`, points: 3},
        rowTwo: {rowId: `foo$id3-row-two`, points: 4},
        rowThree: {rowId: `foo$id3-row-three`, points: 3},
        rowFour: {rowId: `foo$id3-row-four`, points: 3}
    },
    points: 13,
    hadTurn: false,
    isEliminated: {check: true, whenEliminated: 2},
    id: 'foo$id4'
  }],
  players: 3}

    test('EliminationPage renders as expected', () => {
      const wrapper = shallow(<EliminationPage {...props}/>)
    
      expect(wrapper).toMatchSnapshot();
    })

    describe('Character maps render correctly', function(){
      const wrapper = shallow(<EliminationPage {...props}/>)
      test('Exactly one character renders inside the Main Image container', function(){
        expect(wrapper.find('[alt="The most recent losing competitor"]')).toHaveLength(1);
        expect(wrapper.find('[alt="The most recent losing competitor"]')).toEqual(props.characters[3])
      })
    })
  })