import {Link} from 'react-router-dom'

export default function GovtTile({region}) {
    return (
        <div className='government-tile'>
                        <div className='government-tile__info'>
                            <div className='tile-info__type'>
                                <div className='info-type info-type__icon'>
                                    <i className="fas fa-map-marked-alt"></i>
                                </div>
                                <div className='info-type info-type__text'>
                                    <Link to='/'><h4>Region Name Here</h4></Link>
                                </div>
                            </div>
                            <div className='tile-info__population'>
                                <div className='info-population info-population__icon'>
                                    <i class="fas fa-users"></i>
                                </div>
                                <div className='info-population info-population__text'>
                                    <h5>Aequitas Pop: {`region.pop`}</h5>
                                </div>
                            </div>
                            <div className='tile-info__offices'>
                                <div className='info-offices info-offices__icon'>
                                    <i className="fas fa-landmark"></i>
                                </div>
                                <div className='info-offices info-offices__text'>
                                    <Link to={`/region`}><h5>...see Offices</h5></Link>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}