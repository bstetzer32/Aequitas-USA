import React from "react";
import {Link} from 'react-router-dom'

function TopicTile({topic}) {
    return (
        
                        <Link to={`/topics/${topic.id}`}><div className='office-tile'>
            <div className="prob-solv-tile__info__location on-hover">
                        <div className="prob-solv-tile__info__location__icon">
                            <i className="fas fa-map-marked-alt"></i>
                        </div>
                        <div className="prob-solv-tile__info__location__text">
                            {topic.name}
                        </div>
                    </div>
        </div>
                        </Link>
    )
}

export default TopicTile