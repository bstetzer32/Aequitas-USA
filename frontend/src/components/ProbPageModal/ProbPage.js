import React from "react";
import {  useSelector } from "react-redux";
import ProbSolvTile from "../LandingPage/utils/ProbSolvTile";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import './Prob.css';
import ProbFormPage from "../SolvFormModal/SolvForm";

function ProbPage({i, type}) {
  const feed = useSelector(state => state.feed)
  const sessionUser = useSelector(state => state.session.user);
  const info = feed[i]
    const dateString = new Date(info?.createdAt)
    const date = dateString.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
  const pageNames = useSelector(state => state.subscription.pageNames)
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
                <div className='tile-banner'>
                    <div className='tile-banner__secondary-icon'>
                        <i className="fas fa-highlighter"></i>
                    </div>
                    <div className='tile-banner__secondary-text'>
                        {`${`${Math.floor(Math.random() * 10000) +1000}`}`}
                    </div>
                </div>
                <div className='date-banner'>
                    <div className='date-banner__text'>
                        {date.toLocaleString({year: 'numeric', month: 'long', day: 'numeric'})}
                    </div>
                    <div className='date-banner__icon'>
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                </div>
                <div className="main-description">
                    {info?.description}
                </div>
                <div>
                    <h3>Solutions</h3>
                </div>
                {sessionUser?.authenticated ? <ProbFormPage id={info.id}/> : null}
                {info.solutions?.map((x, j) => <ProbSolvTile j={j} i={i} key={`problem-${i}-solution${j}`}/>
                )}
            </div>
    )
}

export default ProbPage;