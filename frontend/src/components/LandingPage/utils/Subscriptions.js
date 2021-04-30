import React from "react";
import GovtTile from "./GovtTile";


function Subscriptions({name}) {
  
    return(
            <div className='government'>
                <div className='government__header'>
                    <h2>Your Government</h2>
                </div>
                <div className='government__tiles'>
                    <GovtTile />
                    <GovtTile />
                    <GovtTile />
                    <GovtTile />
                    <GovtTile />
                    <GovtTile />
                    <GovtTile />
                </div>
            </div>
    )
}

export default Subscriptions