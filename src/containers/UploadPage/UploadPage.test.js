import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import React from 'react';
import { shallow } from 'enzyme';

import { UploadPage } from './UploadPage';
import * as urls from '../../constants/urls';

var wrapper;
var props;
var component;

describe('When unconnected component first renders', function(){
    beforeEach(function(){
        props = {
                    characters: [{hadTurn: false, id: 'foo$id'},{hadTurn: false, id: 'foo$id1'},
                                {hadTurn: false, id: 'foo$id2'},{hadTurn: false, id: 'foo$id3'}], 
                    players: 4
                };
        wrapper = shallow(<UploadPage {...props}/>);
        component = wrapper.instance();
    })
    let props = {characters: [], players: 4}
    wrapper = shallow(<UploadPage {...props}/>)
    test('UploadPagerenders as expected', () => {
        expect(wrapper).toMatchSnapshot();
    })
    describe('state initializes as expected', function(){
        test('initializes state w/ empty imageUrl', function(){
            expect(component.state.imageUrl).toBe('');
        })
        test('initializes state w/ modalDisplayToggle set to true', function(){
            expect(component.state.modalDisplayToggle).toBe(true);
        })
    })
    describe('conditionally rendered elements behave as expected', function(){
        describe('modal behaves as exepected', function(){
            test('modal does not render if the characters array is empty.', function(){
                props = {...props, characters: []}
                wrapper = shallow(<UploadPage {...props}/>);
        
                expect(wrapper.exists('#modal')).toBe(false);
            })
            test('modal does not render if the characters array contains at least one character but its hadTurn property is false.', function(){
                expect(wrapper.exists('#modal')).toBe(false);
            })
            test('modal DOES render if the characters array contains at least one character and its hadTurn property is true.', function(){
                props = {...props, characters: [{hadTurn: true, id: 'foo$id'}]}
                wrapper = shallow(<UploadPage {...props}/>);
                expect(wrapper.exists('#modal')).toBe(true);
            })
        })
        describe('`to attribute` of `#beginGameButton` renders as expected', function(){
            test('Given that there are fewer characters than players, the Begin Game to attribute will be urls.NOT_ENOUGH_CHARACTERS.', function(){
                props = {characters: [], players: 4}
                wrapper = shallow(<UploadPage {...props}/>);
        
                expect(wrapper.exists(`[to="${urls.NOT_ENOUGH_CHARACTERS}"]`)).toBe(true);
                expect(wrapper.exists(`[to="${urls.VOTING_PAGE}"]`)).not.toBe(true);
            })
            test('Given that there are more characters w/ hadTurn:false than players, the Begin Game to attribute will be urls.NOT_ENOUGH_CHARACTERS.', function(){
                props = {...props, players: 3}
                wrapper = shallow(<UploadPage {...props}/>);
        
                expect(wrapper.exists(`[to="${urls.NOT_ENOUGH_CHARACTERS}"]`)).toBe(true);
                expect(wrapper.exists(`[to="${urls.VOTING_PAGE}"]`)).not.toBe(true);
            })
            describe('Given that the number of characters w/ hadTurn:false === players, the Begin Game to attribute will be urls.VOTING_PAGE.', function(){
                test('when number of characters === players, and all characters have hadTurn:false', function(){
                    expect(wrapper.exists(`[to="${urls.NOT_ENOUGH_CHARACTERS}"]`)).not.toBe(true);
                    expect(wrapper.exists(`[to="${urls.VOTING_PAGE}"]`)).toBe(true);
                })
                test('when number of characters !== players, but number w/ hadTurn:false === players', function(){
                    props = {...props, characters: [{hadTurn: false, id: 'foo$id'},{hadTurn: false, id: 'foo$id1'},
                                                        {hadTurn: false, id: 'foo$id2'},{hadTurn: false, id: 'foo$id3'},
                                                        {hadTurn: true, id: 'foo$id4'}]};
                    wrapper = shallow(<UploadPage {...props}/>);
        
                    expect(wrapper.exists(`[to="${urls.NOT_ENOUGH_CHARACTERS}"]`)).not.toBe(true);
                    expect(wrapper.exists(`[to="${urls.VOTING_PAGE}"]`)).toBe(true);
                })
            })
        })
    })
})
describe('When unconnected component props or state update', function(){
    describe('When state.modalDisplayToggle toggles', function(){
        test('When UploadPage.modalDisplayHandler is invoked, modal render toggles.', function(){
            let props = {characters: [{hadTurn: true, id: 'foo$id'}], players: 4}
            let wrapper = shallow(<UploadPage {...props}/>)
            const component = wrapper.instance();
    
            expect(wrapper.exists('#modal')).toBe(true);

            component.modalDisplayHandler()
            expect(wrapper.exists('#modal')).toBe(false);
            
            component.modalDisplayHandler()
            expect(wrapper.exists('#modal')).toBe(true);
        })
    })
})

    
