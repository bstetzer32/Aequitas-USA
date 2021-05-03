import {Link} from 'react-router-dom'

export default function GovtTile({region}) {
    return (
        <div className='government-tile'>
                            <div className='tile-info__type'>
                                <Link to={`/regions/${region.id}`}>
                                    <div className='info-type info-type__icon'>
                                        <i className="fas fa-map-marked-alt"></i>
                                    </div>
                                </Link>
                                <div className='info-type info-type__text'>
                                    <h4>{region.name}</h4>
                                </div>
                            </div>
                            <div className='tile-info__offices'>
                                <div className='info-offices info-offices__text'>
                                    <Link to={`/regions/${region.id}`}><h5>Offices</h5></Link>
                                </div>
                                <div className='info-offices info-offices__icon'>
                                    <i className="fas fa-landmark"></i>
                                </div>
                            </div>
                    </div>
    )
}