import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { shallow } from 'enzyme';

import { Home } from './Home';

var wrapper = null;

describe('Basic render tests for component', function(){
    test('renders as expected', () => {
      wrapper = shallow(<Home/>)
    
      expect(wrapper).toMatchSnapshot();
    })
})

describe('Conditional Rendering Tests for unconnected component', function(){
  beforeEach(function(){
    const props = {players: 3}
    wrapper = shallow(<Home {...props} />)
  })
  describe('when players === 3 or players === 4', function(){
    test('Link and SubmitButton render once each', function(){
      expect(wrapper.exists('Link')).toBe(true);
      expect(wrapper.exists('#beginButton')).toBe(true);

      wrapper.setProps({players: 4});

      expect(wrapper.exists('Link')).toBe(true);
      expect(wrapper.exists('#beginButton')).toBe(true);
    })
  })
  describe('when players !== 3 and players !== 4', function(){
    test('Link and SubmitButton do not render', function(){
      wrapper.setProps({players: 0});
      
      expect(wrapper.exists('Link')).toBe(false);
      expect(wrapper.exists('#beginButton')).toBe(false);

      wrapper.setProps({players: 5})

      expect(wrapper.exists('Link')).toBe(false);
      expect(wrapper.exists('#beginButton')).toBe(false);
    })
  })
})
