import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { shallow } from 'enzyme';

import EliminationPage from './EliminationPage';

describe('Basic render tests for component', function(){
    test('App renders as expected', () => {
      const wrapper = shallow(<EliminationPage/>)
    
      expect(wrapper).toMatchSnapshot();
    })
  })