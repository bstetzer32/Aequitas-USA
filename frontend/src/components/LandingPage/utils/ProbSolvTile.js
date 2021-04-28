import React from "react";
import './ProbSolvTile.css'

export default function ProbSolvTile({a, type}) {
    return (
            <div className="prob-solv-tile">
                <div className="prob-solv-tile__info">
                    <div className="prob-solv-tile__info__title">
                        <div className="prob-solv-tile__info__title__icon">
                            <i className="fas fa-exclamation-circle"></i>
                        </div>
                        <div className="prob-solv-tile__info__title__text">
                            {type}{a.title}
                        </div>
                    </div>
                    <div className="prob-solv-tile__info__location">
                        <div className="prob-solv-tile__info__location__icon">
                            <i className="fas fa-map-marked-alt"></i>
                        </div>
                        <div className="prob-solv-tile__info__location__text">
                            {a.region}
                        </div>
                    </div>
                    <div className="prob-solv-tile__info__highlight">
                        <div className="prob-solv-tile__info__topic__icon">
                            <i className="fas fa-book"></i>
                        </div>
                        <div className="prob-solv-tile__info__topic__text">
                            {a.topic}
                        </div>
                    </div>
                    <div className="prob-solv-tile__info__highlight">
                        <div className="prob-solv-tile__info__highlight__icon">
                            <i className="fas fa-highlighter"></i>
                        </div>
                        <div className="prob-solv-tile__info__highlight__text">
                            {`${a.highlight}%`}
                        </div>
                    </div>
                    <div className="prob-solv-tile__info__date">
                        <div className="prob-solv-tile__info__date__icon">
                            <i className="fas fa-calendar-alt"></i>
                        </div>
                        <div className="prob-solv-tile__info__date__text">
                            {a.date}
                        </div>
                    </div>
                </div>
                <div className="prob-solv-tile__img">
                    <img className='prob-solv-tile__img' alt='tile__img' src={a.img}></img>
                </div>
            </div>
        )
}