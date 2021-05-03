import React from "react";
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import ProbFormModal from '../ProbFormModal'
import ProbSolvTile from "./utils/ProbSolvTile";
import ProbFormPage from "../SolvFormModal/SolvForm";

export default function ColOne({info, type}) {
    const {id} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const region = useSelector(state => state.subscription.pageNames?.regions[id -1]);    
    const pageNames = useSelector(state => state.subscription.pageNames)
    const dateString = new Date(info?.createdAt)
    const date = dateString.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
    if (info) {return (
        <div className="col col-1 col-main">
                <div className='tile-banner'>
                    <div>
                        <i className="fas fa-exclamation-circle"
                        id="tile-banner__main-icon"></i>
                    </div>
                    <div className='tile-banner__main-text'>
                    {info?.title}
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
                {sessionUser?.authenticated ? <ProbFormPage i={0} id={info.id} key={`solv-form${0}`}/> : null}
                {info.solutions?.map((x, j) => <ProbSolvTile j={j} i={0} key={`solv-${j}`} />
                )}
            </div> 
    )} else return (
        <div className="col col-1 col-main">
            <h2>Doesn't look like there are any problems in {region?.name}.</h2>
            <h2>Disagree with us? Submit your problem below.</h2>
            <ProbFormModal/>
        </div>
    )
}