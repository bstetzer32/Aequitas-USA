import React from "react";

function Subscriptions({name}) {
  
    return(
            <div className='government'>
                <div className='government__header'>
                    <h2>Your Government</h2>
                </div>
                <div className='government__tiles'>
                    <div className='government-tile'>
                        <div className='government-tile__info'>
                            <div className='tile-info__type'>
                                <div className='info-type info-type__icon'>
                                    <i className="fas fa-landmark"></i>
                                </div>
                                <div className='info-type info-type__text'>
                                    <h4>Region Name Here</h4>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Subscriptions