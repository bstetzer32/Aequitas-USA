import React from "react";
import {  useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import './Solv.css';

function SolvPage({i, j}) {
  const feed = useSelector(state => state.feed)
  const info = feed[i]
    const dateString = new Date(info?.createdAt)
    const date = dateString.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
  const pageNames = useSelector(state => state.subscription.pageNames)
    return (
        <div className="col col-1 col-main">
                <div className='tile-banner'>
                    <div>
                        <i className="fas fa-scroll"
                        id="tile-banner__main-icon"></i>
                    </div>
                    <div className='tile-banner__main-text'>
                    {info?.solutions[j] ? info?.solutions[j].title : null}
                    </div>
                <div>
                    <img className='col-main__img-main' alt='main' src={ 'https://i.stack.imgur.com/y9DpT.jpg'}></img>
                </div>
                </div>
                <div className="main-description">
                    {info?.solutions[j] ? info?.solutions[j].thesis : null}
                </div>
                <div className='tile-banner'>
                    <div className='tile-banner__secondary-icon'>
                        <i className="fas fa-map-marked-alt"></i>
                    </div>
                    <div className='tile-banner__secondary-text'>
                    {pageNames?.regions[info?.regionId - 1]?.name}
                    </div>
                </div>
                <div className='tile-banner'>
                    <div className='tile-banner__secondary-icon'>
                        <i className="fas fa-book"></i>
                    </div>
                    <div className='tile-banner__secondary-text'>
                    {pageNames?.topics[info?.topicId - 1]?.name}
                    </div>
                </div>
                {/* <div className='tile-banner'>
                    <div className='tile-banner__secondary-icon'>
                        <i className="fas fa-highlighter"></i>
                    </div>
                    <div className='tile-banner__secondary-text'>
                        {`${`${Math.floor(Math.random() * 10000) +1000}`}`}
                    </div>
                </div> */}
                <div className='date-banner'>
                    <div className='date-banner__text'>
                        {date.toLocaleString({year: 'numeric', month: 'long', day: 'numeric'})}
                    </div>
                    <div className='date-banner__icon'>
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                </div>
                <div className="main-description">
                    {info?.solutions[j] ? info?.solutions[j].proposal : null}
                </div>
            </div>
    )
}

export default SolvPage;