import React, {  }from "react";
import {useSelector, } from 'react-redux'
import UserProbTile from './UserProbTile'
import './UserProbs.css'


function UserProbs() {
    // const offices = useSelector(state => state.subscription.pageSubs)
    const probs = useSelector(state => state.feed);
    // const regionNames = useSelector(state => state.subscription.pageNames);
    return (
        <div className='office-container'>
            <div className='office-header' >
                <h2>{probs?.length ? `Your Problems` : null}</h2>
            </div>
            <div className='office-tiles'>
                {probs?.map((prob, i) => <UserProbTile key={`probs-${i}`} prob={prob}/>)}
            </div>
        </div>
    )
}

export default UserProbs