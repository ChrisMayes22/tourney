export const INITIALIZE_CHARACTER = 'INITIALIZE_CHARACTER';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
export const REMOVE_LOWEST_SCORE = 'REMOVE_LOWEST_SCORE';
export const RATE_CHARACTER = 'RATE_CHARACTER';
export const SUBMIT_CHARACTER_RATINGS = 'SUBMIT_CHARACTER_RATINGS';
export const SET_PLAYERS = 'SET_PLAYERS';
export const RESET_FOR_FINALS = 'RESET_FOR_FINALS';
export const CHOOSE_WINNER = 'CHOOSE_WINNER';

export const initializeCharacter = function(imageUrl, id){
    return {type: INITIALIZE_CHARACTER, 
        payload: {image: imageUrl, id}}
}
export const removeCharacter = function(id){
    console.log('Remove Character Dispatched')
    console.log(REMOVE_CHARACTER)
    return {type: REMOVE_CHARACTER, id}
}
export const removeLowestScore = function(){
    return {type: REMOVE_LOWEST_SCORE};
}
export const rateCharacter = function(points, rowId, character){
    return {type: RATE_CHARACTER, payload:{
        points, rowId, character}}
}
export const submitCharacterRatings = function(playersArray){
    return {type: SUBMIT_CHARACTER_RATINGS, payload:{
        players: playersArray
    }};
};
export const setPlayers = function(num){
    return {type: SET_PLAYERS, number: num}
};
export const resetForFinals = function(){
    return {type: RESET_FOR_FINALS}
}
export const chooseWinner = function(character){
    return {type: CHOOSE_WINNER, character}
}

