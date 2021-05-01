import React from "react";

export default function ColOne({info, type}) {
    return (
        <div className="col col-1 col-main">
                <div className='tile-banner'>
                    <div>
                        <i className="fas fa-exclamation-circle"
                        id="tile-banner__main-icon"></i>
                    </div>
                    <div className='tile-banner__main-text'>
                    {type}{info?.title}
                    </div>
                <div>
                    <img className='col-main__img-main' alt='main' src={info?.img ? info.img : 'https://i.stack.imgur.com/y9DpT.jpg'}></img>
                </div>
                </div>
                <div className="main-description">
                    {info?.summary}
                </div>
                <div className='tile-banner'>
                    <div className='tile-banner__secondary-icon'>
                        <i className="fas fa-map-marked-alt"></i>
                    </div>
                    <div className='tile-banner__secondary-text'>
                    {info?.region}
                    </div>
                </div>
                <div className='tile-banner'>
                    <div className='tile-banner__secondary-icon'>
                        <i className="fas fa-book"></i>
                    </div>
                    <div className='tile-banner__secondary-text'>
                    {info?.topic}
                    </div>
                </div>
                <div className='tile-banner'>
                    <div className='tile-banner__secondary-icon'>
                        <i className="fas fa-highlighter"></i>
                    </div>
                    <div className='tile-banner__secondary-text'>
                        {`${info?.highlight}%`}
                    </div>
                </div>
                <div className='date-banner'>
                    <div className='date-banner__text'>
                        {info?.date}
                    </div>
                    <div className='date-banner__icon'>
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                </div>
            </div>
    )
}