import React from "react";
import ProbSolvTile from './utils/ProbSolvTile'
import * as Scroll from 'react-scroll'
import {useSelector, useDispatch} from 'react-redux'

export default function ColTwo({type}) {
    const feed = useSelector(state => state.feed)
    const info = feed.slice(1)
    console.log(info)
    return (
            <div className= "col col-2" id='feed-scroll'>
                {info.map((info, i) => <ProbSolvTile type={type} key={`tile-${i}`}i={i+1}/>)}
                <button>Load More</button>
            </div>
        )
}