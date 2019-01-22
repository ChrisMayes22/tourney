import * as actionTypes from '../constants/actions';

const initialState = {
    characters: [],
    players: 0
}

export function subCharAtIndex(arrayCopy, modChar){
    const index = arrayCopy.findIndex(character => character.id === modChar.id);
    arrayCopy[index] = modChar
    return arrayCopy;
}


export function rootReducer(state=initialState, action) {

    console.log(action)

    function createReplacementCharsArray(charArray, payloadArray){
        const characters = [...state.characters];
        payloadArray.forEach(payload => {
            const character = charArray.filter(char => char.id === payload.id)[0];
            const index = [...state.characters].findIndex(char => char.id === payload.id);
            characters[index] = character;
        })

        return characters;
    }

    switch(action.type) {
        case actionTypes.SET_PLAYERS:
        console.log(`dispatch called in reducer: ${action}`)
        return{
            ...state,
            players: action.number
        }
        case actionTypes.INITIALIZE_CHARACTER:
        //dispatch({type: actionTypes.INITIALIZE_CHARACTER, payload: {image: imageUrl, id: id}})
            return {
                ...state,
                characters: [...state.characters, {
                    imageUrl: action.payload.image,
                    roundRatings: {
                        rowOne: {rowId: `${action.payload.id}-row-1`, points: 1},
                        rowTwo: {rowId: `${action.payload.id}-row-2`, points: 1},
                        rowThree: {rowId: `${action.payload.id}-row-3`, points: 1},
                        rowFour: {rowId: `${action.payload.id}-row-4`, points: 1}
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
                targetCharacter.roundRatings[row] = currentRow;
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

            return{
                ...state,
                characters: characters
            }
        
        case actionTypes.REMOVE_LOWEST_SCORE:
        // dispatch({type: actionTypes.REMOVE_LOWEST_SCORE})

        function reduceToLowestScore(accumulator, currentValue){
            if(accumulator.points < currentValue.points){
                return accumulator;
            } else {
                return currentValue;
            }
        }

        const lowestScore = [...state.characters].filter(char => !char.isEliminated.check).reduce(reduceToLowestScore);

        const lowestScoreCopy = {...lowestScore, isEliminated: {check: true, whenEliminated: 
                                                                    [...state.characters].filter(char => char.isEliminated.check).length}};

        const charsCopy = subCharAtIndex([...state.characters], lowestScoreCopy);

            return {
                ...state,
                characters: charsCopy
            };

        case actionTypes.RESET_FOR_FINALS:
        //dispatch({type: actionTypes.RESET_FOR_FINALS})

        const charsOfState = [...state.characters].map(char => {
            const character = {...char,
                roundRatings: {
                    rowOne: {rowId: `${char.id}-row-1`, points: 1},
                    rowTwo: {rowId: `${char.id}-row-2`, points: 1},
                    rowThree: {rowId: `${char.id}-row-3`, points: 1},
                    rowFour: {rowId: `${char.id}-row-4`, points: 1}
                },
                points: 0,
                hadTurn: false
            };
            return character;
        });

        return{
            ...state,
            characters: charsOfState
        }

        case actionTypes.CHOOSE_WINNER:

        const stateCharsCopy = [...state.characters];

        const loser = {...stateCharsCopy.find(character => character.id === action.character.id)};

        loser.isEliminated = {...loser.isEliminated, 
                                check: true, 
                                whenEliminated: [...state.characters].filter(char => char.isEliminated.check).length}

        const newChars = subCharAtIndex([...state.characters], loser);

            return {
                ...state,
                characters: newChars
            };

        default: 
            return state;
    }
}