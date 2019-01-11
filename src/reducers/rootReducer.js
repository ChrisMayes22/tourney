import * as actionTypes from './actions';

const initialState = {
    characters: [],
    inPlayIndices: {first: '', second: '', third: ''},
    characterRatings: {
        playerOne: {
            charId: '',
            rowOne: {rowId: '', points: 0},
            rowTwo: {rowId: '', points: 0},
            rowThree: {rowId: '', points: 0},
            rowFour: {rowId: '', val: 0}
        },
        playerTwo: {
            charId: '',
            rowOne: {rowId: '', points: 0},
            rowTwo: {rowId: '', points: 0},
            rowThree: {rowId: '', points: 0},
            rowFour: {rowId: '', points: 0}
        },
        playerThree: {
            charId: '',
            rowOne: {rowId: '', points: 0},
            rowTwo: {rowId: '', points: 0},
            rowThree: {rowId: '', points: 0},
            rowFour: {rowId: '', points: 0}
        }
    }
}

export function rootReducer(state=initialState, action) {
    switch(action.type) {
        case actionTypes.INITIALIZE_CHARACTER:
            return {
                ...state,
                characters: [...state.characters, {
                    imageUrl: action.image,
                    points: 0,
                    hadTurn: false,
                    id: `url=${String(action.image)}${Math.floor(Math.random()*1000)}`
                }]
            }
        case actionTypes.REMOVE_CHARACTER:
            const copy = [...state.characters];
            return{
                ...state,
                characters: copy.filter(el => {
                    return el.id !== action.id 
                })
            };
        case actionTypes.RATE_CHARACTER:
            const characterRatings = {...state.characterRatings};
            const keys = Object.keys(characterRatings);
            keys.forEach(el => {
                const player = {...characterRatings[el]}
                const playerKeys = Object.keys(player);
                playerKeys.forEach(play => {
                    const row = {...player[play]}
                    if(row.rowId === action.payload.rowId){
                        characterRatings[el][play].points = action.payload.points;
                    }
                })
            })

            return{
                ...state,
                characterRatings: characterRatings
            }
        case actionTypes.MATCH_CHARACTERS_AND_ROWS: 
            return{
                ...state,
                characterRatings: {
                    ...state.characterRatings,
                    playerOne: {
                        charId: action.payload.playerOne.id,
                        rowOne: {rowId: `${action.payload.playerOne.id}-row-one`, points: 0},
                        rowTwo: {rowId: `${action.payload.playerOne.id}-row-two`, points: 0},
                        rowThree: {rowId: `${action.payload.playerOne.id}-row-three`, points: 0},
                        rowFour: {rowId: `${action.payload.playerOne.id}-row-four`, points: 0}
                    },
                    playerTwo: {
                        charId: action.payload.playerTwo.id,
                        rowOne: {rowId: `${action.payload.playerTwo.id}-row-one`, points: 0},
                        rowTwo: {rowId: `${action.payload.playerTwo.id}-row-two`, points: 0},
                        rowThree: {rowId: `${action.payload.playerTwo.id}-row-three`, points: 0},
                        rowFour: {rowId: `${action.payload.playerTwo.id}-row-four`, points: 0}
                    },
                    playerThree: {
                        charId: action.payload.playerThree.id,
                        rowOne: {rowId: `${action.payload.playerThree.id}-row-one`, points: 0},
                        rowTwo: {rowId: `${action.payload.playerThree.id}-row-two`, points: 0},
                        rowThree: {rowId: `${action.payload.playerThree.id}-row-three`, points: 0},
                        rowFour: {rowId: `${action.payload.playerThree.id}-row-four`, points: 0}
                    }
                }
            }
        case actionTypes.SUBMIT_CHARACTER_RATINGS:

        const chars = [...state.characters];
        const ratings = {...state.characterRatings};
        const ratingsKeys = Object.keys(ratings);

        function reduceCharacterPoints(character) {
            const playerPointsArray = [];
            ratingsKeys.forEach(player => {
                const currentPlayer = {...ratings[player]}
                const currentPlayerKey = Object.keys(currentPlayer);
                if(character.id === currentPlayer.charId){
                    currentPlayerKey.forEach(row => {
                        const currentRow = {...currentPlayer[row]};
                        if(currentRow.rowId){
                            playerPointsArray.push(currentRow.points);
                        }
                    })
                }
            })
            const pointTotal = playerPointsArray.reduce(function(accumulator, currentValue){
                return accumulator + currentValue;
            })

            const char = {...character, points: pointTotal, hadTurn: true};
            return char;
        }

        function findCharacterIndex(character) {
            return chars.findIndex(char => {
                return character.id === char.id
            })
        }

        const firstCharacter = reduceCharacterPoints(action.payload.playerOne);
        const firstCharacterIndex = findCharacterIndex(firstCharacter);
        const secondCharacter = reduceCharacterPoints(action.payload.playerTwo);
        const secondCharacterIndex = findCharacterIndex(secondCharacter);
        const thirdCharacter = reduceCharacterPoints(action.payload.playerThree);
        const thirdCharacterIndex = findCharacterIndex(thirdCharacter);
        chars[firstCharacterIndex] = firstCharacter;
        chars[secondCharacterIndex] = secondCharacter;
        chars[thirdCharacterIndex] = thirdCharacter;

        return{
            ...state,
            characters: chars
        }
        
        case actionTypes.HALVE_CHARACTERS:
            return state;
        default: 
            return state;
    }
}

