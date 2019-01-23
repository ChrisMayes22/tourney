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
    describe('Characters map renders properly', function(){
      test('when characters map renders, only characters for which hadTurn:true render', function(){
          let props = {characters: [{hadTurn: false, id: 'foo$id', imageUrl: 'foo$image'},
                                    {hadTurn: false, id: 'foo$id1', imageUrl: 'foo$image'},
                                    {hadTurn: false, id: 'foo$id', imageUrl: 'foo$image'},
                                    {hadTurn: false, id: 'foo$id1', imageUrl: 'foo$image'},
                                    {hadTurn: true, id: 'foo$id', imageUrl: 'foo$image'},
                                    {hadTurn: true, id: 'foo$id1', imageUrl: 'foo$image'},
                                    {hadTurn: true, id: 'foo$id', imageUrl: 'foo$image'},
                                    {hadTurn: true, id: 'foo$id1', imageUrl: 'foo$image'}], 
                        players: 4}
          const wrapper = shallow(<VotingPage {...props}/>);

          expect(wrapper.find('[character]')).toHaveLength(4);
      })
    })
})

