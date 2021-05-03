import React from "react";
import './ProbSolvTile.css'
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import ProbPageModal from '../../ProbPageModal'
import SolvPageModal from '../../SolvPageModal'

export default function ProbSolvTile({i, j, type}) {
    const feed = useSelector(state => state.feed)
    const probInfo = feed[i]
    const info = feed[i].solutions[j]
    const pageNames = useSelector(state => state.subscription.pageNames)
    const dateString = new Date(feed[i].createdAt)
    const date = dateString.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
    return (
            <div className="prob-solv-tile">
                <div className="prob-solv-tile__info">
                    <div className="prob-solv-tile__info__title">
                        {type === 'problem' ? <ProbPageModal i={i} title={feed[i].title} /> : feed[i].solutions ? <SolvPageModal i={i} j={j} title={feed[i].solutions[j]?.title}/> : null}
                    </div>
                        <Link to={`/regions/${type === 'problem' ? feed[i].regionId : feed[i]}`}>
                    <div className="prob-solv-tile__info__location on-hover">
                        <div className="prob-solv-tile__info__location__icon">
                            <i className="fas fa-map-marked-alt"></i>
                        </div>
                        <div className="prob-solv-tile__info__location__text">
                            {pageNames?.regions[feed[i].regionId - 1].name}
                        </div>
                    </div>
                        </Link>
                        <Link to={`/topics/${feed[i].topicId}`}>
                    <div className="prob-solv-tile__info__topic  on-hover">
                        <div className="prob-solv-tile__info__topic__icon">
                            <i className="fas fa-book"></i>
                        </div>
                        <div className="prob-solv-tile__info__topic__text">
                            {pageNames?.topics[feed[i].topicId - 1].name}
                        </div>
                    </div>
                        </Link>
{type === 'problem' ? <div className="prob-solv-tile__info__highlight">
                        <div className="prob-solv-tile__info__highlight__icon">
                            <i className="fas fa-highlighter"></i>
                        </div>
                        <div className="prob-solv-tile__info__highlight__text">
                            {`${`${Math.floor(Math.random() * 10000) +1000}`}`}
                        </div>
                    </div> : null}
                    <div className="prob-solv-tile__info__date">
                        <div className="prob-solv-tile__info__date__icon">
                            <i className="fas fa-calendar-alt"></i>
                        </div>
                        <div className="prob-solv-tile__info__date__text">
                            {date.toLocaleString({year: 'numeric', month: 'long', day: 'numeric'})}
                        </div>
                    </div>
                </div>
                <div className="prob-solv-tile__img">
                    {type !== 'problem' ? <img className='prob-solv-tile__img' alt='tile__img' src={info?.img ? info.img : 'https://i.stack.imgur.com/y9DpT.jpg'}></img> : <img className='prob-solv-tile__img' alt='tile__img' src={probInfo?.img ? probInfo.img : 'https://i.stack.imgur.com/y9DpT.jpg'}></img>}
                    
                </div>
            </div>
        )
}