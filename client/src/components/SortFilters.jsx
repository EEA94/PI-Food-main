import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, getRecipes } from "../actions";

export default function SortFilters({handleFilterByDiets, handleFilterByScore, handleFilterByName}){
    const diets = useSelector((state)=>state.diets);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getDiets())
    },[dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
      }

    return (
        <div>
            <select onChange={(e)=>handleFilterByName(e)} defaultValue='default'>
                <option value='default' disabled >Alphabetical order</option>
                <option value='asc' >A-Z</option>
                <option value='desc' >Z-A</option>
            </select>
            <select onChange={(e)=>handleFilterByScore(e)} defaultValue='default'>
            <option value='default' disabled>Order by score</option>
            <option value='desc'>Higher</option>
            <option value='asc'>Lower</option>
            </select>
            <select onChange={(e)=>handleFilterByDiets(e)}>
                <option value='all'>All Diets</option>
                {diets?.map(d=>(
                        <option value={d.name} key={d.id}>{d.name}</option>))}
            </select>

            <button onClick={(e)=>handleClick(e)}>BACK TO ALL RECIPES</button>
        </div>
    )

}


