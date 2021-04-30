import React from "react";
import GovtTile from "./GovtTile";
import {useSelector} from 'react-redux'


function Subscriptions({name}) {
  const regionSubs = useSelector(state => state.session.subs?.regionSubs);
  const regions = regionSubs
  console.log(regionSubs)
    
    return(
            <div className='government'>
                <div className='government__header'>
                    <h2>Your Government</h2>
                </div>
                <div className='government__tiles'>
                    {regionSubs?.map(region => <GovtTile region={region}  />)}
                </div>
            </div>
    )
}

export default Subscriptions