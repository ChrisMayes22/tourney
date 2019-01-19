import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { shallow } from 'enzyme';

import { Winner } from './Winner';

describe('When unconnected component first renders', function(){
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
    }],
    players: 3}

    test('Winner renders as expected', () => {
      
      const wrapper = shallow(<Winner {...props}/>)
    
      expect(wrapper).toMatchSnapshot();
    })
    describe('Characters render as expected', function(){
      test('Exactly one winner character renders', function(){
        const wrapper = shallow(<Winner {...props}/>)

        expect(wrapper.find('[alt="the winner!"]')).toHaveLength(1);
      })
      test('The number of losers === this.props.characters.length-1', function(){
        const wrapper = shallow(<Winner {...props}/>)

        expect(wrapper.find('[alt="a losing competitor"]')).toHaveLength(2);
      })
      test('The number of rendered characters === props.characters.length', function(){
        const wrapper = shallow(<Winner {...props}/>)

        expect(wrapper.find('img')).toHaveLength(3);
      })
    })
})
  