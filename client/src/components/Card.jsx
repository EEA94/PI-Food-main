import React from "react";
import { Link } from "react-router-dom";

export default function Card({name, img, diet, id}){
return (
    <div>
        <h3>{name}</h3>
        <img src={img} alt="recipe not found"/>
        <h5>{diet?.map((el,index)=>
            <ul key={index}>
                <li>{el.name}</li>
            </ul>
        )}</h5>
        <Link to={'/recipe/'+id}>Recipe details</Link>
    </div>
)
}