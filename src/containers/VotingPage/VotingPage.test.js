import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { shallow } from 'enzyme';

import { VotingPage } from './VotingPage';

import configureStore from 'redux-mock-store';
const middleware = [];
const mockStore = configureStore(middleware);

describe('When unconnected component first renders', function(){
    test('VotingPage renders as expected', () => {
      const props = {characters:[], players:4}
      const wrapper = shallow(<VotingPage {...props}/>)
    
      expect(wrapper).toMatchSnapshot();
    })
    // describe('Characters map renders properly', function(){
    //   test('when characters map renders, only characters for which hadTurn:true render', function(){
    //       let props = {characters: [{hadTurn: false, id: 'foo$id', imageUrl: 'foo$image'},
    //                                 {hadTurn: false, id: 'foo$id1', imageUrl: 'foo$image'},
    //                                 {hadTurn: false, id: 'foo$id', imageUrl: 'foo$image'},
    //                                 {hadTurn: false, id: 'foo$id1', imageUrl: 'foo$image'},
    //                                 {hadTurn: true, id: 'foo$id', imageUrl: 'foo$image'},
    //                                 {hadTurn: true, id: 'foo$id1', imageUrl: 'foo$image'},
    //                                 {hadTurn: true, id: 'foo$id', imageUrl: 'foo$image'},
    //                                 {hadTurn: true, id: 'foo$id1', imageUrl: 'foo$image'}], 
    //                     players: 4}
    //       const wrapper = shallow(<VotingPage {...props}/>);

    //       expect(wrapper.find('[character]')).toHaveLength(4);
    //   })
    // })
})

//TODO: Combine testing for what used to be FinalsPage w/ new VotingPage


// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// configure({ adapter: new Adapter(), disableLifecycleMethods: true });

// import React from 'react';
// import { shallow } from 'enzyme';

// import { FinalsPage } from './FinalsPage';

// let props = null;
// let wrapper = null;
// let component = null;

// describe('When unconnected FinalsPage first renders', function(){
//     beforeEach(function(){
//         props = {characters: [{
//             imageUrl: `foo$Image1`,
//             roundRatings: {
//                 rowOne: {rowId: `foo$id1-row-1`, points: 5},
//                 rowTwo: {rowId: `foo$id1-row-2`, points: 5},
//                 rowThree: {rowId: `foo$id1-row-3`, points: 5},
//                 rowFour: {rowId: `foo$id1-row-4`, points: 5}
//             },
//             points: 20,
//             hadTurn: false,
//             isEliminated: {check: false, whenEliminated: null},
//             id: 'foo$id1'
//           },
//           {
//             imageUrl: `foo$Image2`,
//             roundRatings: {
//                 rowOne: {rowId: `foo$id2-row-1`, points: 1},
//                 rowTwo: {rowId: `foo$id2-row-2`, points: 1},
//                 rowThree: {rowId: `foo$id2-row-3`, points: 1},
//                 rowFour: {rowId: `foo$id2-row-4`, points: 1}
//             },
//             points: 4,
//             hadTurn: false,
//             isEliminated: {check: false, whenEliminated: null},
//             id: 'foo$id2'
//           },
//           {
//             imageUrl: `foo$Image3`,
//             roundRatings: {
//                 rowOne: {rowId: `foo$id3-row-1`, points: 2},
//                 rowTwo: {rowId: `foo$id3-row-2`, points: 2},
//                 rowThree: {rowId: `foo$id3-row-3`, points: 2},
//                 rowFour: {rowId: `foo$id3-row-4`, points: 2}
//             },
//             points: 8,
//             hadTurn: false,
//             isEliminated: {check: false, whenEliminated: null},
//             id: 'foo$id3'
//           }],
//           players: 3
//         }
        
//         wrapper = shallow(<FinalsPage {...props}/>)
//         component = wrapper.instance();
//     })
//     test('FinalsPage renders as expected', function(){
//         expect(wrapper).toMatchSnapshot();
//     })
//     describe('When state initializes', function(){
//         test('state.modal is true', function(){
//             expect(component.state.modal).toBe(true);
//         })
//     })
//     describe('When character map in modal is initialized', function(){
//         test('The number of characters rendered === number of non-eliminated characters', function(){
//             expect(wrapper.find('[alt="competitor"]')).toHaveLength(3);
//         });
//         test('eliminated characters should not be rendered in modal', function(){
//             props = {characters: [{
//                     imageUrl: `foo$Image1`,
//                     roundRatings: {
//                         rowOne: {rowId: `foo$id1-row-1`, points: 5},
//                         rowTwo: {rowId: `foo$id1-row-2`, points: 5},
//                         rowThree: {rowId: `foo$id1-row-3`, points: 5},
//                         rowFour: {rowId: `foo$id1-row-4`, points: 5}
//                     },
//                     points: 20,
//                     hadTurn: false,
//                     isEliminated: {check: false, whenEliminated: null},
//                     id: 'foo$id1'
//                 },
//                 {
//                     imageUrl: `foo$Image2`,
//                     roundRatings: {
//                         rowOne: {rowId: `foo$id2-row-1`, points: 1},
//                         rowTwo: {rowId: `foo$id2-row-2`, points: 1},
//                         rowThree: {rowId: `foo$id2-row-3`, points: 1},
//                         rowFour: {rowId: `foo$id2-row-4`, points: 1}
//                     },
//                     points: 4,
//                     hadTurn: false,
//                     isEliminated: {check: true, whenEliminated: 0},
//                     id: 'foo$id2'
//                 }],
//                 players: 3
//             };
//             wrapper = shallow(<FinalsPage {...props}/>)
//             component = wrapper.instance();

//             expect(wrapper.exists('[src="foo$Image2"]')).toBe(false);
//             expect(wrapper.exists('[src="foo$Image1"]')).toBe(true);
//             expect(wrapper.find('[alt="competitor"]')).toHaveLength(1);
//         })
//     })
//     describe('When the .grid container is rendered', function(){
//         test('The first character rendered is the first non-eliminated character in props.characters', function(){
//             expect(wrapper.find('#first-char').prop('character')).toEqual(props.characters[0]);
//         })
//         test('The second character rendered is the second non-eliminated character in props.characters', function(){
//             expect(wrapper.find('#second-char').prop('character')).toEqual(props.characters[1]);
//         })
//     })
// })

// describe('When unconnected component methods are invoked', function(){
//     beforeEach(function(){
//         props = {characters: [{
//             imageUrl: `foo$Image`,
//             roundRatings: {
//                 rowOne: {rowId: `foo$id1-row-1`, points: 5},
//                 rowTwo: {rowId: `foo$id1-row-2`, points: 5},
//                 rowThree: {rowId: `foo$id1-row-3`, points: 5},
//                 rowFour: {rowId: `foo$id1-row-4`, points: 5}
//             },
//             points: 20,
//             hadTurn: false,
//             isEliminated: {check: false, whenEliminated: null},
//             id: 'foo$id1'
//           },
//           {
//             imageUrl: `foo$Image`,
//             roundRatings: {
//                 rowOne: {rowId: `foo$id2-row-1`, points: 1},
//                 rowTwo: {rowId: `foo$id2-row-2`, points: 1},
//                 rowThree: {rowId: `foo$id2-row-3`, points: 1},
//                 rowFour: {rowId: `foo$id2-row-4`, points: 1}
//             },
//             points: 4,
//             hadTurn: false,
//             isEliminated: {check: false, whenEliminated: null},
//             id: 'foo$id2'
//           },
//           {
//             imageUrl: `foo$Image`,
//             roundRatings: {
//                 rowOne: {rowId: `foo$id3-row-1`, points: 2},
//                 rowTwo: {rowId: `foo$id3-row-2`, points: 2},
//                 rowThree: {rowId: `foo$id3-row-3`, points: 2},
//                 rowFour: {rowId: `foo$id3-row-4`, points: 2}
//             },
//             points: 8,
//             hadTurn: false,
//             isEliminated: {check: false, whenEliminated: null},
//             id: 'foo$id3'
//           }],
//           players: 3
//         }
    
//         wrapper = shallow(<FinalsPage {...props}/>)
//         component = wrapper.instance();
//     })
    
//     test('Given state.modal === true, when toggleModalHandler is invoked, then state.modal === false', function(){
//         expect(component.state.modal).toBe(true);
//         component.toggleModalHandler();
//         expect(component.state.modal).toBe(false);
//     })
//     test('Given state.modal === false, when toggleModalHandler is invoked, then state.modal === true', function(){
//         wrapper.setState({modal: false});
//         expect(component.state.modal).toBe(false);
//         component.toggleModalHandler();
//         expect(component.state.modal).toBe(true);
//     })
// })