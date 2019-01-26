import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { shallow } from 'enzyme';

import { EliminationPage } from './EliminationPage';
import * as urls from '../../constants/urls';

let props;
let wrapper;

describe('When unconnected EliminationPage first renders', function(){
  beforeEach(function(){
    props = {characters: [{isEliminated:{check: true}},{isEliminated:{check: false}},{isEliminated:{check: false}},
    {isEliminated:{check: false}},{isEliminated:{check: false}},{isEliminated:{check: false}},
    {isEliminated:{check: false}},{isEliminated:{check: false}}]};

    wrapper = shallow(<EliminationPage {...props}/>)
  })

    test('EliminationPage renders as expected', () => {
      expect(wrapper).toMatchSnapshot();
    })
    describe('Link urls render as expected', function(){
      test('Given there are 7 or more non-eliminated characters, only link to urls.ELIMINATION_PAGE should exist', function(){
        expect(wrapper.exists(`[to="${urls.ELIMINATION_PAGE}"]`)).toBe(true);
        expect(wrapper.exists(`[to="${urls.VOTING_PAGE}"]`)).toBe(false);
      })      
      test('Given there are 6 or fewer non-eliminated characters, only link to urls.VOTING_PAGE should exist', function(){
        props = {characters: [{isEliminated:{check: true}},{isEliminated:{check: false}},{isEliminated:{check: false}},
                  {isEliminated:{check: false}},{isEliminated:{check: false}},{isEliminated:{check: false}},
                  {isEliminated:{check: false}}]};

        const wrapper = shallow(<EliminationPage {...props}/>)

        expect(wrapper.exists(`[to="${urls.ELIMINATION_PAGE}"]`)).toBe(false);
        expect(wrapper.exists(`[to="${urls.VOTING_PAGE}"]`)).toBe(true);
      })  
    })
    describe('Conditionally rendered text renders as expected', function(){
      test('Given there are 6 or fewer non-eliminated characters, Continue Button should have text `On to the finals!`', function(){
        props = {characters: [{isEliminated:{check: true}},{isEliminated:{check: false}},{isEliminated:{check: false}},
          {isEliminated:{check: false}},{isEliminated:{check: false}},{isEliminated:{check: false}},
          {isEliminated:{check: false}}]};
        const wrapper = shallow(<EliminationPage {...props}/>);

        expect(wrapper.find('#EliminationPage__continueButton').prop('children')).toEqual('On to the finals!')
      })
      test('Given there are 7 or more non-eliminated characters, Continue Button should have text `Eliminate another!`', function(){
        expect(wrapper.find('#EliminationPage__continueButton').prop('children')).toEqual('Eliminate another!')
      })
    })

  })