import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { shallow } from 'enzyme';

import SubmitButton from './SubmitButton';

describe('Basic render tests for component', function(){
    test('App renders as expected', () => {
      const wrapper = shallow(<SubmitButton/>)
    
      expect(wrapper).toMatchSnapshot();
    })
  })