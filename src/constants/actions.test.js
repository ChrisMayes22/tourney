import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import configureStore from 'redux-mock-store';
import * as actions from './actions';

const mockStore = configureStore();
const store = mockStore();

describe('When actions are dispatched', function(){
    beforeEach(function(){
        store.clearActions();
    });
    describe('When initializeCharacter is dispatched', function(){
        test('dispatches the correct action and payload', function(){
            let action = [{type: actions.INITIALIZE_CHARACTER, 
                payload: {image: 'foo$url', id: 'foo$id'}}];

            store.dispatch(actions.initializeCharacter('foo$url', 'foo$id'));
            expect(store.getActions()).toEqual(action);
            expect(store.getActions()).toMatchSnapshot();
        })
    });
    describe('When removeCharacter is dispatched', function(){
        test('dispatches the correct action and payload', function(){
            let action = [{type: actions.REMOVE_CHARACTER, id: 'foo$id'}];

            store.dispatch(actions.removeCharacter('foo$id'));
            expect(store.getActions()).toEqual(action);
            expect(store.getActions()).toMatchSnapshot();
        })
    });
    describe('When removeLowestScore is dispatched', function(){
        test('dispatches the correct action and payload', function(){
            let action = [{type: actions.REMOVE_LOWEST_SCORE}];

            store.dispatch(actions.removeLowestScore());
            expect(store.getActions()).toEqual(action);
            expect(store.getActions()).toMatchSnapshot();
        })
    });
    describe('When rateCharacter is dispatched', function(){
        test('dispatches the correct action and payload', function(){
            let action = [{type: actions.RATE_CHARACTER, payload:{
                points: 1,
                rowId: 'foo$id',
                character: 'foo$character'
            }}];

            store.dispatch(actions.rateCharacter(1, 'foo$id', 'foo$character'));
            expect(store.getActions()).toEqual(action);
            expect(store.getActions()).toMatchSnapshot();
        })
    });
    describe('When submitCharacterRatings is dispatched', function(){
        test('dispatches the correct action and payload', function(){
            let action = [{type: actions.SUBMIT_CHARACTER_RATINGS, payload:{
                players: 'foo$players'
            }}];

            store.dispatch(actions.submitCharacterRatings('foo$players'));
            expect(store.getActions()).toEqual(action);
            expect(store.getActions()).toMatchSnapshot();
        })
    });
    describe('When setPlayers is dispatched', function(){
        test('dispatches the correct action and payload', function(){
            let action = [{type: actions.SET_PLAYERS, number: 3}];

            store.dispatch(actions.setPlayers(3));
            expect(store.getActions()).toEqual(action);
            expect(store.getActions()).toMatchSnapshot();
        })
    });
    describe('When resetForFinals is dispatched', function(){
        test('dispatches the correct action and payload', function(){
            let action = [{type: actions.RESET_FOR_FINALS}];

            store.dispatch(actions.resetForFinals());
            expect(store.getActions()).toEqual(action);
            expect(store.getActions()).toMatchSnapshot();
        })
    });
})
