import React from "react";
import {Link} from 'react-router-dom'

function RegionTile({region}) {
    // console.log(region)
    return (
        
                        <Link to={`/regions/${region.id}`}><div className='office-tile'>
            <div className="prob-solv-tile__info__location on-hover">
                        <div className="prob-solv-tile__info__location__icon">
                            <i className="fas fa-map-marked-alt"></i>
                        </div>
                        <div className="prob-solv-tile__info__location__text">
                            {region.name}
                        </div>
                    </div>
        </div>
                        </Link>
    )
}

export default RegionTile