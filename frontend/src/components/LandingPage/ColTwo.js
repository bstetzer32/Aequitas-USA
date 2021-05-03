import React, {useState} from "react";
import ProbSolvTile from './utils/ProbSolvTile'
import {useSelector, useDispatch} from 'react-redux'
import * as feedActions from "../../store/feed";
import { useParams } from "react-router-dom";

export default function ColTwo({type}) {
    const [offset, setOffset] = useState(20)
    const {id} = useParams()
    const dispatch = useDispatch();
    const feed = useSelector(state => state.feed)
    const info = feed.slice(1)
    const sessionUser = useSelector(state => state.session.user);
    const context = sessionUser? sessionUser.id : 1
    const loadMore = () => {
                if (id === undefined) {
            dispatch(feedActions.getItems(context, offset))
            setOffset(current => current + 20)
        } else {
            dispatch(feedActions.getPageItems(type, id, offset))
            setOffset(current => current + 20)

        }
    }
    return (
            <div className= "col col-2" id='feed-scroll'>
                {info.map((info, i) => <ProbSolvTile type={'problem'} key={`tile-${i}`}i={i+1}/>)}
                <button onClick={() => loadMore()}>Load More</button>
            </div>
        )
}