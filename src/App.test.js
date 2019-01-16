import requestAnimationFrame from './tempPolyfills';
 
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from './containers/Home/Home';
import CharacterRedirect from './components/CharacterRedirect/CharacterRedirect';
import VotingPage from './containers/VotingPage/VotingPage';
import UploadPage from './containers/UploadPage/UploadPage';
import EliminationPage from './containers/EliminationPage/EliminationPage';
import FinalsPage from './containers/FinalsPage/FinalsPage';
import Winner from './containers/Winner/Winner';
import componentNotFound from './components/ComponentNotFound/ComponentNotFound';
import App from './App';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

//TODO: Either figure out a way to pass appropriate state to components that use large portions of the app's tree, OR
//Figure out how to test routes without invoking the entire tree of the component associated w/ the tested route.


describe('Basic render tests for component', function(){
  test('App renders as expected', () => {
    const wrapper = shallow(<App/>)
  
    expect(wrapper).toMatchSnapshot();
  })
})
describe('Routing tests for react-router', function(){
  test('invalid path should redirect to 404', () => {

    const initialState = {
      characters: [],
      players: 0
    }
  
    const mockReducer = function(state=initialState, action){
      return state
    }
  
    const store = createStore(mockReducer)
  
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/rANdOmm' ]}>
          <App/>
        </MemoryRouter>
      </Provider>
    );
  
      expect(wrapper.find(VotingPage)).toHaveLength(0);
      expect(wrapper.find(EliminationPage)).toHaveLength(0);
      expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
      expect(wrapper.find(FinalsPage)).toHaveLength(0);
      expect(wrapper.find(UploadPage)).toHaveLength(0);
      expect(wrapper.find(Winner)).toHaveLength(0);
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(componentNotFound)).toHaveLength(1);
  });
  
  test('`/voting-page` should direct to `VotingPage` component.', () => {
    const initialState = {
      characters: [],
      players: 0
    }
  
    const mockReducer = function(state=initialState, action){
      return state
    }
  
    const store = createStore(mockReducer)
  
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/voting-page' ]}>
          <App/>
        </MemoryRouter>
      </Provider>
    );
  
    console.log(wrapper.debug())
  
      expect(wrapper.find(VotingPage)).toHaveLength(1);
      expect(wrapper.find(EliminationPage)).toHaveLength(0);
      expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
      expect(wrapper.find(FinalsPage)).toHaveLength(0);
      expect(wrapper.find(UploadPage)).toHaveLength(0);
      expect(wrapper.find(Winner)).toHaveLength(0);
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(componentNotFound)).toHaveLength(0);
  });
  
  // test('`/elimination-page` should direct to `EliminationPage` component.', () => {
  //   const initialState = {
  //     characters: [{isEliminated: {check: false}}],
  //     players: 0
  //   }
  
  //   const mockReducer = function(state=initialState, action){
  //     return state
  //   }
  
  //   const store = createStore(mockReducer)
  
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={[ '/elimination-page' ]}>
  //         <App/>
  //       </MemoryRouter>
  //     </Provider>
  //   );
  
  //     expect(wrapper.find(VotingPage)).toHaveLength(0);
  //     expect(wrapper.find(EliminationPage)).toHaveLength(1);
  //     expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
  //     expect(wrapper.find(FinalsPage)).toHaveLength(0);
  //     expect(wrapper.find(UploadPage)).toHaveLength(0);
  //     expect(wrapper.find(Winner)).toHaveLength(0);
  //     expect(wrapper.find(Home)).toHaveLength(0);
  //     expect(wrapper.find(componentNotFound)).toHaveLength(0);
  // });
  
  test('`/not-enough-characters` should direct to `CharacterRedirect` component.', () => {
    const initialState = {
      characters: [],
      players: 0
    }
  
    const mockReducer = function(state=initialState, action){
      return state
    }
  
    const store = createStore(mockReducer)
  
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/not-enough-characters' ]}>
          <App/>
        </MemoryRouter>
      </Provider>
    );
  
      expect(wrapper.find(VotingPage)).toHaveLength(0);
      expect(wrapper.find(EliminationPage)).toHaveLength(0);
      expect(wrapper.find(CharacterRedirect)).toHaveLength(1);
      expect(wrapper.find(FinalsPage)).toHaveLength(0);
      expect(wrapper.find(UploadPage)).toHaveLength(0);
      expect(wrapper.find(Winner)).toHaveLength(0);
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(componentNotFound)).toHaveLength(0);
  });
  
  // test('`/finals` should direct to `FinalsPage` component.', () => {
  //   const initialState = {
  //     character: {character: {imageUrl: null}},
  //     characters: [{
  //       imageUrl: null,
  //       roundRatings: {
  //           rowOne: {rowId: `-row-one`, points: 0},
  //           rowTwo: {rowId: `-row-two`, points: 0},
  //           rowThree: {rowId: `-row-three`, points: 0},
  //           rowFour: {rowId: `-row-four`, points: 0}
  //       },
  //       points: 0,
  //       hadTurn: false,
  //       isEliminated: {check: false, whenEliminated: null},
  //       id: null
  //   }],
  //     players: 0
  //   }
  
  //   const mockReducer = function(state=initialState, action){
  //     return state
  //   }
  
  //   const store = createStore(mockReducer)
  
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={[ '/finals' ]}>
  //         <App/>
  //       </MemoryRouter>
  //     </Provider>
  //   );
  
  //     expect(wrapper.find(VotingPage)).toHaveLength(0);
  //     expect(wrapper.find(EliminationPage)).toHaveLength(0);
  //     expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
  //     expect(wrapper.find(FinalsPage)).toHaveLength(1);
  //     expect(wrapper.find(UploadPage)).toHaveLength(0);
  //     expect(wrapper.find(Winner)).toHaveLength(0);
  //     expect(wrapper.find(Home)).toHaveLength(0);
  //     expect(wrapper.find(componentNotFound)).toHaveLength(0);
  // });
  
  test('`/upload-page` should redirect to `UploadPage` component.', () => {
    const initialState = {
      characters: [],
      players: 0
    }
  
    const mockReducer = function(state=initialState, action){
      return state
    }
  
    const store = createStore(mockReducer)
  
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/upload-page' ]}>
          <App/>
        </MemoryRouter>
      </Provider>
    );
  
      expect(wrapper.find(VotingPage)).toHaveLength(0);
      expect(wrapper.find(EliminationPage)).toHaveLength(0);
      expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
      expect(wrapper.find(FinalsPage)).toHaveLength(0);
      expect(wrapper.find(UploadPage)).toHaveLength(1);
      expect(wrapper.find(Winner)).toHaveLength(0);
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(componentNotFound)).toHaveLength(0);
  });
  
  // test('`/winner` should redirect to `Winner` component.', () => {
  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={[ '/winner' ]}>
  //       <App/>
  //     </MemoryRouter>
  //   );
  
  //     expect(wrapper.find(VotingPage)).toHaveLength(0);
  //     expect(wrapper.find(EliminationPage)).toHaveLength(0);
  //     expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
  //     expect(wrapper.find(FinalsPage)).toHaveLength(0);
  //     expect(wrapper.find(UploadPage)).toHaveLength(0);
  //     expect(wrapper.find(Winner)).toHaveLength(1);
  //     expect(wrapper.find(Home)).toHaveLength(0);
  //     expect(wrapper.find(componentNotFound)).toHaveLength(0);
  // });
  
  test('`/` should redirect to `Home` component.', () => {
    const initialState = {
      characters: [],
      players: 0
    }
  
    const mockReducer = function(state=initialState, action){
      return state
    }
  
    const store = createStore(mockReducer)
  
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/' ]}>
          <App/>
        </MemoryRouter>
      </Provider>
    );
  
      expect(wrapper.find(VotingPage)).toHaveLength(0);
      expect(wrapper.find(EliminationPage)).toHaveLength(0);
      expect(wrapper.find(CharacterRedirect)).toHaveLength(0);
      expect(wrapper.find(FinalsPage)).toHaveLength(0);
      expect(wrapper.find(UploadPage)).toHaveLength(0);
      expect(wrapper.find(Winner)).toHaveLength(0);
      expect(wrapper.find(Home)).toHaveLength(1);
      expect(wrapper.find(componentNotFound)).toHaveLength(0);
  });
})



