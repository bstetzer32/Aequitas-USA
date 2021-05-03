import React from "react";
import {Link} from 'react-router-dom'

function UserProbTile({prob}) {
    return (
        
                        <div className='office-tile'>
            <div className="prob-solv-tile__info__location on-hover">
                        <div className="prob-solv-tile__info__location__icon">
                            <i className="fas fa-exclamation-circle"></i>
                        </div>
                        <div className="prob-solv-tile__info__location__text">
                            {prob.title}
                        </div>
                    </div>
        </div>
    )
}

export default UserProbTile