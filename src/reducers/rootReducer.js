import * as actionTypes from './actions';

const initialState = {
    characters: [],
    players: NaN
}

export function rootReducer(state=initialState, action) {

    function subCharAtIndex(arrayCopy, modChar){
        const index = arrayCopy.findIndex(character => character.id === modChar.id);
        arrayCopy[index] = modChar
        return arrayCopy;
    }

    function createReplacementCharsArray(charArray, payloadArray){
        const characters = [...state.characters];
        payloadArray.forEach(payload => {
            const character = charArray.filter(char => char.id === payload.id)[0];
            console.log('PAYLOAD')
            console.log(payload)
            console.log('CHAR ARRAY')
            console.log(charArray);
            console.log('CHAR ARRAY FILTER')
            console.log(charArray.filter(char => char.id === payload.id))
            console.log('CHARACTER')
            console.log(character)
            const index = [...state.characters].findIndex(char => char.id === payload.id);
            characters[index] = character;
            console.log('CHARACTERS')
            console.log(characters)
        })

        return characters;
    }

    switch(action.type) {
        case actionTypes.SET_PLAYERS:
        return{
            ...state,
            players: action.number
        }
        case actionTypes.INITIALIZE_CHARACTER:
        //dispatch({type: actionTypes.INITIALIZE_CHARACTER, image: imageUrl})
            return {
                ...state,
                characters: [...state.characters, {
                    imageUrl: action.payload.image,
                    roundRatings: {
                        rowOne: {rowId: `${action.payload.id}-row-one`, points: 0},
                        rowTwo: {rowId: `${action.payload.id}-row-two`, points: 0},
                        rowThree: {rowId: `${action.payload.id}-row-three`, points: 0},
                        rowFour: {rowId: `${action.payload.id}-row-four`, points: 0}
                    },
                    points: 0,
                    hadTurn: false,
                    isEliminated: {check: false, whenEliminated: null},
                    id: action.payload.id
                }]
            }

        case actionTypes.REMOVE_CHARACTER:
        //dispatch({type: actionTypes.REMOVE_CHARACTER, id: id})
            const copy = [...state.characters].filter(char => char.id !== action.id);
            return{
                ...state,
                characters: copy
            };

        case actionTypes.RATE_CHARACTER:
        //dispatch({type: actionTypes.RATE_CHARACTER, payload: {points: points, rowId: rowId, character: character}})

            let currentChars = [...state.characters]
            let targetCharacter = currentChars.filter(char => char.id === action.payload.character.id)[0];
            const ratings = {...targetCharacter.roundRatings}
            const ratingsKeys = Object.keys(ratings);

            ratingsKeys.forEach(function(row) {
                const currentRow = {...ratings[row]};
                if(ratings[row].rowId === action.payload.rowId){
                    currentRow.points = action.payload.points;
                }
                targetCharacter.roundRatings[row] = currentRow
            })

            currentChars = subCharAtIndex([...currentChars], targetCharacter);

            return{
                ...state,
                characters: currentChars
            }

        case actionTypes.SUBMIT_CHARACTER_RATINGS:
        // dispatch({type: actionTypes.SUBMIT_CHARACTER_RATINGS, payload:{players: playersArray}});
            let chars = [...state.characters].filter(char => !char.hadTurn);


            chars.forEach(char => {
                let pointTotal = [];
                const ratings = {...char.roundRatings};
                const ratingsKeys = Object.keys(ratings);
                ratingsKeys.forEach(function(row) {
                    const currentRow = {...ratings[row]};
                    pointTotal = pointTotal.concat(currentRow.points);
                })
                const sum = pointTotal.reduce(function(accumulator, currentValue){
                    return accumulator + currentValue;
                }, 0);
                char = {...char,
                            points: sum,
                            hadTurn: true
                        }
                chars = subCharAtIndex([...chars], char);
            })

            const characters = [...createReplacementCharsArray(chars, action.payload.players)];

            console.log('CHARACTERS')
            console.log(characters)

            return{
                ...state,
                characters: characters
            }
        
        case actionTypes.REMOVE_LOWEST_SCORE:

        function reduceToLowestScore(accumulator, currentValue){
            if(accumulator.points < currentValue.points){
                return accumulator;
            } else {
                return currentValue;
            }
        }

        const lowestScore = [...state.characters].filter(char => !char.isEliminated.check).reduce(reduceToLowestScore);

        lowestScore.isEliminated = {check: true, whenEliminated: [...state.characters].filter(char => char.isEliminated.check).length};

        const charsCopy = subCharAtIndex([...state.characters], lowestScore);

            return {
                ...state,
                characters: charsCopy
            };

        case actionTypes.RESET_FOR_FINALS:

        let charsOfState = [...state.characters];

        charsOfState.forEach(char => {
            const character = {...char,
                                hadTurn: false,
                                roundRatings: {
                                    rowOne: {rowId: `${char.id}-row-one`, points: 0},
                                    rowTwo: {rowId: `${char.id}-row-two`, points: 0},
                                    rowThree: {rowId: `${char.id}-row-three`, points: 0},
                                    rowFour: {rowId: `${char.id}-row-four`, points: 0}
                                }
                            };
            charsOfState = subCharAtIndex(charsOfState, character)
        })

        return{
            ...state,
            characters: charsOfState
        }

        default: 
            return state;
    }
}