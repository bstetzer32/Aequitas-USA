import React from "react";
import ProbSolvTile from './utils/ProbSolvTile'

export default function ColTwo({a, type}) {
    return (
            <div className= "col col-2">
                <ProbSolvTile type={type} a={a}/>
                <ProbSolvTile type={type} a={a}/>
                <ProbSolvTile type={type} a={a}/>
                <ProbSolvTile type={type} a={a}/>
            </div>
        )
}