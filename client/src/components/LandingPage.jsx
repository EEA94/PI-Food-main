import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return (
        <div>
            <h1>Welcome to my recipe page</h1>
            <Link to='/home'>
                <button>To go</button>
            </Link>
        </div>
    )
}