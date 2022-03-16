import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { getRecipes } from "../actions";
import PaginateLogic from "./PaginateLogic";

export default function Paginate(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.allRecipes);
    
    useEffect(()=>{
        dispatch(getRecipes());
    },[dispatch])
    
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);
    const iLastRecipe = currentPage * recipesPerPage; //6
    const iFirstRecipe = iLastRecipe - recipesPerPage; //0
    const currentRecipes = allRecipes.slice(iFirstRecipe,iLastRecipe);
    
    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

return (
    <div>
        <div>
        <PaginateLogic allRecipes={allRecipes.length} recipesPerPage={recipesPerPage} paginado={paginado} />
        </div>
        <div>
        {currentRecipes?.map((el) => {
          return (
            
          <Card key={el.id} id={el.id} name={el.name} img={el.image} diet={el.diets}/>
          
        )})}
        </div>
        
    </div>
)

}




