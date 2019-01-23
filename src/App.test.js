import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from './containers/Home/Home';
import componentNotFound from './components/ComponentNotFound/ComponentNotFound';
import App from './App';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import * as urls from './constants/urls';

//TODO: Either figure out a way to pass appropriate state to components that use large portions of the app's tree, OR
//Figure out how to test routes without invoking the entire tree of the component associated w/ the tested route.


describe('Basic render tests', function(){
  test('App renders as expected', () => {
    const wrapper = shallow(<App/>)
  
    expect(wrapper).toMatchSnapshot();
  })
})
describe('When rendering routes', function(){
  test('Invalid path should redirect to 404', () => {

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
  
      expect(wrapper.find(Home)).toHaveLength(0);
      expect(wrapper.find(componentNotFound)).toHaveLength(1);
  });
  
  test('Valid path should not redirect to componentNotFound component.', () => {
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
        <MemoryRouter initialEntries={[ urls.HOME ]}>
          <App/>
        </MemoryRouter>
      </Provider>
    );
  
    console.log(wrapper.debug())
  
      expect(wrapper.find(Home)).toHaveLength(1);
      expect(wrapper.find(componentNotFound)).toHaveLength(0);
  });
});