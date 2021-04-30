import React from "react";
import ProbSolvTile from './utils/ProbSolvTile'

export default function ColTwo({info, type}) {
    return (
            <div className= "col col-2">
                {info.map((info, i) => <ProbSolvTile type={type} key={`tile-${i}`}info={info[i]}/>)}
                

            </div>
        )
}