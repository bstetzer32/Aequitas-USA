import React, {  }from "react";
import {useSelector, } from 'react-redux'
import TopicTile from './TopicTile'
import './Topics.css'


function Topics() {
    // const offices = useSelector(state => state.subscription.pageSubs)
    const topics = useSelector(state => state.subscription.pageNames?.topics);
    // const regionNames = useSelector(state => state.subscription.pageNames);
    return (
        <div className='office-container'>
            <div className='office-header' >
                <h2>{topics?.length ? `Topics` : null}</h2>
            </div>
            <div className='office-tiles'>
                {topics?.map((topic, i) => <TopicTile key={`topic-${i}`} topic={topic}/>)}
            </div>
        </div>
    )
}

export default Topics