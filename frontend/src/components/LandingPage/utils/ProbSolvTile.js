import React from "react";
import './ProbSolvTile.css'
import {useSelector, useDispatch} from 'react-redux'

export default function ProbSolvTile({i, type}) {
    const feed = useSelector(state => state.feed)
    const dateString = new Date(feed[i].createdAt)
    const date = dateString.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
    return (
            <div className="prob-solv-tile">
                <div className="prob-solv-tile__info">
                    <div className="prob-solv-tile__info__title">
                        <div className="prob-solv-tile__info__title__icon">
                            <i className="fas fa-exclamation-circle"></i>
                        </div>
                        <div className="prob-solv-tile__info__title__text">
                            {type}{feed[i].title}
                        </div>
                    </div>
                    <div className="prob-solv-tile__info__location">
                        <div className="prob-solv-tile__info__location__icon">
                            <i className="fas fa-map-marked-alt"></i>
                        </div>
                        <div className="prob-solv-tile__info__location__text">
                            {feed[i].region}
                        </div>
                    </div>
                    <div className="prob-solv-tile__info__highlight">
                        <div className="prob-solv-tile__info__topic__icon">
                            <i className="fas fa-book"></i>
                        </div>
                        <div className="prob-solv-tile__info__topic__text">
                            {feed[i].topic}
                        </div>
                    </div>
                    <div className="prob-solv-tile__info__highlight">
                        <div className="prob-solv-tile__info__highlight__icon">
                            <i className="fas fa-highlighter"></i>
                        </div>
                        <div className="prob-solv-tile__info__highlight__text">
                            {`${feed[i].highlight}%`}
                        </div>
                    </div>
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
                    <img className='prob-solv-tile__img' alt='tile__img' src={feed[i].img ? feed[i].img : 'https://i.stack.imgur.com/y9DpT.jpg'}></img>
                </div>
            </div>
        )
}