const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail:[],
}

export default function rootReducer(state=initialState,action){
switch(action.type){
    case 'GET_RECIPES':
        return {
            ...state,
            recipes: action.payload,
            allRecipes: action.payload
        }
    case 'GET_DIETS':
        return{
            ...state,
            diets:action.payload
        }
    case 'FILTER_BY_DIET':
        const allRecipes = state.allRecipes;
        const stateFiltered = action.payload === 'all' ? allRecipes : allRecipes.filter(recipe => {
        const typeOfDiets = new Set();
        recipe.diets?.forEach(diet => {typeOfDiets.add(diet.name)});
        if(typeOfDiets.has(action.payload))return recipe;
        else return null;
        // const allRecipes = state.allRecipes //copia del estado
        // const stateFiltered = action.payload === "all" ? allRecipes :
        //   allRecipes.filter(recipe => {
        //     let names = recipe.diets.map(d => d.name)
        //     if (names.includes(action.payload)) return recipe
        //     else return null;
        })
        return {
            ...state,
            recipes: stateFiltered
        }
    case 'FILTER_BY_NAME': 
        let orderName = action.payload === 'asc' ?
        state.recipes.sort((a,b)=>{
            if(a.name < b.name)return -1
            if(a.name > b.name)return 1
            return 0
        }) :
        state.recipes.sort((a,b)=>{
            if(a.name < b.name)return 1
            if(a.name > b.name)return -1
            return 0
        })
    return {
        ...state,
        recipes: orderName
    }
    case 'FILTER_BY_SCORE':
        let filterScore = action.payload === 'asc' ?
        state.recipes.sort((a,b)=>{
            if(a.healthScore < b.healthScore)return 1
            if(a.healthScore > b.healthScore)return -1
            return 0
        }) :
        state.recipes.sort((a,b)=>{
            if(a.healthScore < b.healthScore)return -1
            if(a.healthScore > b.healthScore)return 1
            return 0
        })
        return {
            ...state,
            recipes: filterScore
        }

    default:
        return state
}
}
