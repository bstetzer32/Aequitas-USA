import React, {  }from "react";
import {useSelector, } from 'react-redux'
import RegionTile from './RegionTile'
import './Regions.css'


function Regions() {
    // const offices = useSelector(state => state.subscription.pageSubs)
    const regions = useSelector(state => state.subscription.pageNames?.regions);
    // const regionNames = useSelector(state => state.subscription.pageNames);
    return (
        <div className='office-container'>
            <div className='office-header' >
                <h2>{regions?.length ? `Regions` : null}</h2>
            </div>
            <div className='office-tiles'>
                {regions?.map((region, i) => <RegionTile key={`region-${i}`} region={region}/>)}
            </div>
        </div>
    )
}

export default Regions