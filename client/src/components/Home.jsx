import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByDiet, filterByScore, filterByName } from "../actions/index";
import { Link } from "react-router-dom";
import Paginate from "./Paginate";
import SortFilters from "./SortFilters";

export default function Home() {
  const dispatch = useDispatch();
  const [state, setState] = useState(true)

  function handleFilterByDiets(e){
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
  }
  function handleOrderByName(e){
    e.preventDefault();
    dispatch(filterByName(e.target.value));
    state ? setState(false) : setState(true)
  }
  function handleFilterByScore(e){
    e.preventDefault();
    dispatch(filterByScore(e.target.value))
    state ? setState(false) : setState(true)
  }

  return (
    <div>
      <Link to="/recipe">Create Recipe</Link>
      <h1>Home of Food</h1>
      
      <SortFilters 
      handleFilterByDiets={handleFilterByDiets}
      handleOrderByName={handleOrderByName}
      handleFilterByScore={handleFilterByScore}
      />
        <Paginate/>
  
    </div>
  );
}

{/* <select>
        <option value="all">All diets</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="gluten free">Gluten Free</option>
        <option value="dairy free">Dairy Free</option>
        <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
        <option value="pescatarian">Pescetarian</option>
        <option value="paleolithic">Paleo</option>
        <option value="primal">Primal</option>
        <option value="fodmap friendly">Low FODMAP</option>
        <option value="whole 30">Whole 30</option>
      </select> */}