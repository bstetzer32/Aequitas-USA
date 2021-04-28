import React from "react";
import ProbSolvTile from './utils/ProbSolvTile'

export default function ColTwo({a}) {
    return (
            <div className= "col col-2">
                <ProbSolvTile a={a}/>
                <ProbSolvTile a={a}/>
                <ProbSolvTile a={a}/>
                <ProbSolvTile a={a}/>
            </div>
        )
}