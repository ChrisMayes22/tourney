import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

import { rootReducer } from './rootReducer';
import { subCharAtIndex} from './rootReducer';
import * as actionTypes from '../constants/actions';
// import { createReplacementArray } from './rootReducer';

describe('When helper functions are called', function(){
    test('When subCharAtIndex is called, character issubstituted for character w/ matching id in passed array.', function(){
        const charArray = [{
            imageUrl: 'foo$imageUrl',
            points: 0,
            hadTurn: false,
            isEliminated: {check: false, whenEliminated: null},
            id: 'wrong-foo$id'
        },
        {
            imageUrl: 'foo$imageUrl',
            points: 0,
            hadTurn: false,
            isEliminated: {check: false, whenEliminated: null},
            id: 'foo$id'
        }];

        const substituteChar = {
            imageUrl: 'newfoo$imageUrl',
            points: 10,
            hadTurn: true,
            isEliminated: {check: true, whenEliminated: 1},
            id: 'foo$id'
        }

        const newArray = subCharAtIndex([...charArray], substituteChar);

        expect(newArray[1]).toBe(substituteChar);
        expect(newArray[0]).not.toBe(substituteChar);
        expect(newArray.length).toBe(2);
    });
    test('When createReplacementCharsArray is invoked, characters from first argument are put in state at ids matching characters in second argument.', function(){
        
        const state = {
            characters: [{
                imageUrl: 'foo$imageUrl',
                points: 0,
                hadTurn: false,
                isEliminated: {check: false, whenEliminated: null},
                id: 'wrong-foo$id'
            },
            {
                imageUrl: 'foo$imageUrl',
                points: 0,
                hadTurn: false,
                isEliminated: {check: false, whenEliminated: null},
                id: 'foo$id'
            },
            {
                imageUrl: 'foo$imageUrl',
                points: 10,
                hadTurn: true,
                isEliminated: {check: false, whenEliminated: null},
                id: 'foo$id2'
            }]
        }

        const charArr = [{
                imageUrl: 'foo$imageUrl',
                points: 30,
                hadTurn: true,
                isEliminated: {check: false, whenEliminated: null},
                id: 'foo$id'
            },
            {
                imageUrl: 'foo$imageUrl',
                points: 10,
                hadTurn: true,
                isEliminated: {check: true, whenEliminated: 1},
                id: 'foo$id2'
            }
        ]

        const payloadArr = [{
                imageUrl: 'foo$imageUrl',
                points: 0,
                hadTurn: false,
                isEliminated: {check: false, whenEliminated: null},
                id: 'foo$id'
            },
            {
                imageUrl: 'foo$imageUrl',
                points: 10,
                hadTurn: true,
                isEliminated: {check: false, whenEliminated: null},
                id: 'foo$id2'
            }
        ]


        //TODO: Find a way to export this from rootReducer directly. 
        function createReplacementCharsArray(charArray, payloadArray){
            const characters = [...state.characters];
            payloadArray.forEach(payload => {
                const character = charArray.filter(char => char.id === payload.id)[0];
                const index = [...state.characters].findIndex(char => char.id === payload.id);
                characters[index] = character;
            })
            return characters;
        }

        const newArr = createReplacementCharsArray(charArr, payloadArr)

        expect(newArr.length).toBe(3);
        expect(newArr[0].id).toBe('wrong-foo$id');
        expect(newArr[1].points).toBe(30);
        expect(newArr[0]).toBe(state.characters[0]);
        expect(newArr[1]).toBe(charArr[0]);
        expect(newArr[2]).toBe(charArr[1]);
        expect(state.characters.findIndex(char => char.isEliminated.check === newArr[2].isEliminated.check)).toBe(-1);
    })
})

describe('Tests the actions in the Root Reducer', function(){
    describe('Tests actions related to app setup & character initialization', function(){
        test('The `SET_PLAYERS` action updates redux state to match payload.', function(){

            const initialState = {
                characters: [],
                players: 0
            }

            const mockDispatch = {type: actionTypes.SET_PLAYERS, number: 4}

            const setPlayers = rootReducer(initialState, mockDispatch).players;

            expect(setPlayers).toBe(4);
        })
        test('The `INITIALIZE_CHARACTER` action adds a new character to state', function(){

            const initialState = {
                characters: [],
                players: 4
            }

            const character = {
                imageUrl: `foo$Image`,
                roundRatings: {
                    rowOne: {rowId: `foo$id-row-one`, points: 1},
                    rowTwo: {rowId: `foo$id-row-two`, points: 1},
                    rowThree: {rowId: `foo$id-row-three`, points: 1},
                    rowFour: {rowId: `foo$id-row-four`, points: 1}
                },
                points: 0,
                hadTurn: false,
                isEliminated: {check: false, whenEliminated: null},
                id: 'foo$id'
            }

            const mockDispatch = {type: actionTypes.INITIALIZE_CHARACTER, payload: {image: `foo$Image`, id: 'foo$id'}};

            const initCharacter = rootReducer(initialState, mockDispatch).characters[0];

            expect(initCharacter).toEqual(character);
        });
        test('The `REMOVE_CHARACTER` action takes an id & removes a character w/ matching id from state.', function(){
            const initialState = {
                characters: [{id: 'foo$id1'},{id: 'foo$id2'},{id: 'foo$id3'},{id: 'foo$id4'},{id: 'foo$id5'}],
                players: 4
            }

            const characterCheck = [{id: 'foo$id1'},{id: 'foo$id2'},{id: 'foo$id4'},{id: 'foo$id5'}]

            const mockDispatch = {type: actionTypes.REMOVE_CHARACTER, id: 'foo$id3'};

            const finalArray = rootReducer(initialState, mockDispatch).characters;

            expect(finalArray).toEqual(characterCheck);

        })
    });
    describe('Tests actions related to updating characters', function(){
        test('The `RATE_CHARACTER` action updates character row points to match user input.', function(){
            const initialState = {
                characters: [{
                    imageUrl: `foo$Image`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id-row-one`, points: 1},
                        rowTwo: {rowId: `foo$id-row-two`, points: 1},
                        rowThree: {rowId: `foo$id-row-three`, points: 1},
                        rowFour: {rowId: `foo$id-row-four`, points: 1}
                    },
                    points: 0,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id'
                }],
                players: 4
            }

            const mockCharacter = initialState.characters[0]

            const characterCheck = {
                imageUrl: `foo$Image`,
                roundRatings: {
                    rowOne: {rowId: `foo$id-row-one`, points: 1},
                    rowTwo: {rowId: `foo$id-row-two`, points: 5},
                    rowThree: {rowId: `foo$id-row-three`, points: 1},
                    rowFour: {rowId: `foo$id-row-four`, points: 1}
                },
                points: 0,
                hadTurn: false,
                isEliminated: {check: false, whenEliminated: null},
                id: 'foo$id'
            }

            const mockDispatch = {type: actionTypes.RATE_CHARACTER, payload: {points: 5, rowId: 'foo$id-row-two', character: mockCharacter}};

            const finalChar = rootReducer(initialState, mockDispatch).characters[0];

            expect(finalChar).toEqual(characterCheck);
        });
        test('The `SUBMIT_RATINGS` action takes all the values of the roundRatings and sets points equal to their sum', function(){
            const initialState = {
                characters: [{
                    imageUrl: `foo$Image`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id1-row-one`, points: 5},
                        rowTwo: {rowId: `foo$id1-row-two`, points: 4},
                        rowThree: {rowId: `foo$id1-row-three`, points: 3},
                        rowFour: {rowId: `foo$id1-row-four`, points: 1}
                    },
                    points: 0,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id1'
                },
                {
                    imageUrl: `foo$Image`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id2-row-one`, points: 1},
                        rowTwo: {rowId: `foo$id2-row-two`, points: 1},
                        rowThree: {rowId: `foo$id2-row-three`, points: 1},
                        rowFour: {rowId: `foo$id2-row-four`, points: 1}
                    },
                    points: 0,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id2'
                },
                {
                    imageUrl: `foo$Image`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id3-row-one`, points: 2},
                        rowTwo: {rowId: `foo$id3-row-two`, points: 4},
                        rowThree: {rowId: `foo$id3-row-three`, points: 3},
                        rowFour: {rowId: `foo$id3-row-four`, points: 1}
                    },
                    points: 0,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id3'
                },
                {
                    imageUrl: `foo$Image`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id4-row-one`, points: 1},
                        rowTwo: {rowId: `foo$id4-row-two`, points: 4},
                        rowThree: {rowId: `foo$id4-row-three`, points: 3},
                        rowFour: {rowId: `foo$id4-row-four`, points: 1}
                    },
                    points: 0,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id4'
                },
                {
                    imageUrl: `foo$Image`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id5-row-one`, points: 5},
                        rowTwo: {rowId: `foo$id5-row-two`, points: 5},
                        rowThree: {rowId: `foo$id5-row-three`, points: 4},
                        rowFour: {rowId: `foo$id5-row-four`, points: 3}
                    },
                    points: 0,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id5'
                },
                {
                    imageUrl: `foo$Image`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id6-row-one`, points: 2},
                        rowTwo: {rowId: `foo$id6-row-two`, points: 2},
                        rowThree: {rowId: `foo$id6-row-three`, points: 1},
                        rowFour: {rowId: `foo$id6-row-four`, points: 1}
                    },
                    points: 0,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id6'
                }],
                players: 3
            }

            const charOne = initialState.characters[3];
            const charTwo = initialState.characters[4];
            const charThree = initialState.characters[5];

            const mockDispatch = {type: actionTypes.SUBMIT_CHARACTER_RATINGS, payload:{players: [charOne, charTwo, charThree]}};

            const characterOne = {...charOne, points: 9, hadTurn: true};
            const characterTwo = {...charTwo, points: 17, hadTurn: true};
            const characterThree = {...charThree, points: 6, hadTurn: true};

            const finalChars = rootReducer(initialState, mockDispatch).characters;

            expect(finalChars[0]).toBe(initialState.characters[0]);
            expect(finalChars[1]).toBe(initialState.characters[1]);
            expect(finalChars[2]).toBe(initialState.characters[2]);
            expect(finalChars[3]).not.toBe(initialState.characters[3]);
            expect(finalChars[3]).toEqual(characterOne);
            expect(finalChars[4]).toEqual(characterTwo);
            expect(finalChars[5]).toEqual(characterThree);
        })
        test('`REMOVE_LOWEST_SCORE` action finds the character with the fewest point and updates isEliminated.check and isEliminated.whenEliminated.', function(){
            const initialState = {
                characters: [{
                    imageUrl: `foo$Image`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id1-row-one`, points: 5},
                        rowTwo: {rowId: `foo$id1-row-two`, points: 5},
                        rowThree: {rowId: `foo$id1-row-three`, points: 5},
                        rowFour: {rowId: `foo$id1-row-four`, points: 5}
                    },
                    points: 20,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id1'
                },
                {
                    imageUrl: `foo$Image`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id2-row-one`, points: 1},
                        rowTwo: {rowId: `foo$id2-row-two`, points: 1},
                        rowThree: {rowId: `foo$id2-row-three`, points: 1},
                        rowFour: {rowId: `foo$id2-row-four`, points: 1}
                    },
                    points: 4,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id2'
                },
                {
                    imageUrl: `foo$Image`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id3-row-one`, points: 2},
                        rowTwo: {rowId: `foo$id3-row-two`, points: 2},
                        rowThree: {rowId: `foo$id3-row-three`, points: 2},
                        rowFour: {rowId: `foo$id3-row-four`, points: 2}
                    },
                    points: 8,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id3'
                }],
                players: 3
            }

            const mockDispatch = {type: actionTypes.REMOVE_LOWEST_SCORE};

            const firstElim = rootReducer(initialState, mockDispatch);
            const secondElim = rootReducer(firstElim, mockDispatch);
            const thirdElim = rootReducer(secondElim, mockDispatch);

            const firstCharacter = {...initialState.characters[1], isEliminated:{check: true, whenEliminated: 0}};
            const secondCharacter = {...initialState.characters[2], isEliminated:{check: true, whenEliminated: 1}};
            const thirdCharacter = {...initialState.characters[0], isEliminated:{check: true, whenEliminated: 2}};

            expect(firstElim.characters[1]).toEqual(firstCharacter)
            expect(firstElim.characters[0]).toEqual(initialState.characters[0])
            expect(firstElim.characters[2]).toEqual(initialState.characters[2])
            expect(secondElim.characters[2]).toEqual(secondCharacter)
            expect(secondElim.characters[0]).toEqual(initialState.characters[0])
            expect(thirdElim.characters[0]).toEqual(thirdCharacter)
        })
        test('`RESET_FOR_FINALS` should reset hadTurn and roundRatings for all characters.', function(){
            const initialState = {
                characters: [{
                    imageUrl: `foo$Image`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id-row-one`, points: 5},
                        rowTwo: {rowId: `foo$id-row-two`, points: 5},
                        rowThree: {rowId: `foo$id-row-three`, points: 5},
                        rowFour: {rowId: `foo$id-row-four`, points: 5}
                    },
                    points: 20,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: 'foo$id'
                },
                {
                    imageUrl: `foo$Image`,
                    roundRatings: {
                        rowOne: {rowId: `foo$id-row-one`, points: 2},
                        rowTwo: {rowId: `foo$id-row-two`, points: 2},
                        rowThree: {rowId: `foo$id-row-three`, points: 2},
                        rowFour: {rowId: `foo$id-row-four`, points: 2}
                    },
                    points: 8,
                    hadTurn: false,
                    isEliminated: {check: true, whenEliminated: 0},
                    id: 'foo$id'
                }],
                players: 4
            }

            const defaultRounds = {
                rowOne: {rowId: `foo$id-row-one`, points: 1},
                rowTwo: {rowId: `foo$id-row-two`, points: 1},
                rowThree: {rowId: `foo$id-row-three`, points: 1},
                rowFour: {rowId: `foo$id-row-four`, points: 1}
            }

            const mockDispatch = {type: actionTypes.RESET_FOR_FINALS};

            const reset = rootReducer(initialState, mockDispatch).characters;

            expect(reset[0].roundRatings).toEqual(defaultRounds);
            expect(reset[0].points).toBe(0);
            expect(reset[1].roundRatings).toEqual(defaultRounds);
            expect(reset[1].points).toBe(0);
            expect(reset[0].isEliminated.check).toBe(false);
            expect(reset[1].isEliminated.check).toBe(true);
        })
    })
})