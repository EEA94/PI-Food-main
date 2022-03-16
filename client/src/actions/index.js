import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/recipes")
        return dispatch({type:'GET_RECIPES', payload: json.data})
    }
}

export function getDiets(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/types")
        return dispatch({type:'GET_DIETS', payload:json.data})
    }
}

export function filterByDiet(payload){
    return { type: 'FILTER_BY_DIET', payload}
}

export function filterByName(payload){
    return {type: 'FILTER_BY_NAME', payload}
}

export function filterByScore(payload){
    return {type:'FILTER_BY_SCORE', payload}
}


