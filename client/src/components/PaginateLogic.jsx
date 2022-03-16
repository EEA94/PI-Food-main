import React, {useEffect} from "react";

export default function PaginateLogic({allRecipes, paginado, recipesPerPage}){
const pageNumber = [];

for(let i=1; i<=Math.ceil(allRecipes/recipesPerPage); i++){
pageNumber.push(i);
}

useEffect(() => {
    window.scrollTo(0, 0)
})

return (
    <ul>
        {
            pageNumber?.map(num=>
            (
            <li key={num}>
                <button onClick={()=>paginado(num)}>{num}</button>
            </li>
            ))}
    </ul>
)
}