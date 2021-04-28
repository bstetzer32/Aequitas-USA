import React from "react";

export default function ColOne({a}) {
    return (
        <div className="col col-1 col-main">
                <div>
                    <img className='col-main__img-main' alt='main' src={a.img}></img>
                </div>
                <div className='tile-banner'>
                    <div>
                        <i className="fas fa-exclamation-circle"
                        id="tile-banner__main-icon"></i>
                    </div>
                    <div className='tile-banner__main-text'>
                    {a.title}
                    </div>
                </div>
                <div className="main-description">
                    {a.summary}
                </div>
                <div className='tile-banner'>
                    <div className='tile-banner__secondary-icon'>
                        <i class="fas fa-map-marked-alt"></i>
                    </div>
                    <div className='tile-banner__secondary-text'>
                    {a.region}
                    </div>
                </div>
                <div className='tile-banner'>
                    <div className='tile-banner__secondary-icon'>
                        <i class="fas fa-book"></i>
                    </div>
                    <div className='tile-banner__secondary-text'>
                    {a.topic}
                    </div>
                </div>
                <div className='tile-banner'>
                    <div className='tile-banner__secondary-icon'>
                        <i class="fas fa-highlighter"></i>
                    </div>
                    <div className='tile-banner__secondary-text'>
                        {`${a.highlight}%`}
                    </div>
                </div>
                <div className='date-banner'>
                    <div className='date-banner__text'>
                        {a.date.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <div className='date-banner__icon'>
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                </div>
            </div>
    )
}