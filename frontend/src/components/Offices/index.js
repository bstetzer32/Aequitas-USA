import React, { useEffect, useState }from "react";
import {useParams} from "react-router-dom";
import {useSelector} from 'react-redux'
import './Offices.css'


function Offices() {
    const {regionId} = useParams()
    console.log(regionId)
    const region = useSelector(state => state.subscription.pageNames?.regions[parseInt(regionId) - 1]);
    return (
        <div className='office-container'>
            <div className='office-header' >
                <h2>{`Offices in ${region?.name}`}</h2>
            </div>
        </div>
    )
}

export default Offices