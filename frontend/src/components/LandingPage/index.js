import React, { useState, useEffect }from "react";
import {useLocation} from "react-router-dom"
import ColOne from './ColOne'
import ColTwo from './ColTwo'
import ColThree from './ColThree'
import {useSelector, useDispatch} from 'react-redux'
import './LandingPage.css'
// import Feed from './utils/Feed';
// import InfiniteListWithVerticalScroll from './utils/ScrollBox';
import { Route, Switch, useParams } from "react-router-dom";
import * as subActions from "../../store/subscriptions";
import * as feedActions from "../../store/feed";
import * as Scroll from 'react-scroll'


const date = new Date();
const a = {
    title: 'Title Goes Here',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In metus ligula, luctus vitae venenatis auctor, luctus sed justo. Curabitur convallis nunc eget lacinia aliquam.',
    region: 'U.S.A.',
    topic: 'Community',
    highlight: 23,
    date: date.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' }),
    img: 'https://i.stack.imgur.com/y9DpT.jpg'
}

export default function LandingPage ({type}) {

    const location = useLocation();
    const [offset, setOffset] = useState(0)
    const feed = useSelector(state => state.feed)
    
    const sessionUser = useSelector(state => state.session.user);
    const sessionSubs = useSelector(state => state.subscriptions);
    const {id} = useParams()
    console.log (sessionUser, sessionSubs)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(feedActions.resetItems())
    },[location])
    useEffect(() => {
        if (id === undefined) {
            console.log(sessionSubs)
            const context = sessionUser? sessionUser.id : 1
            dispatch(feedActions.getItems(context, 0))
            setOffset(current => current + 20)
        } else {
            dispatch(feedActions.getPageItems(type, id, 0))
            setOffset(current => current + 20)

        }
    },[dispatch, id, sessionSubs, sessionUser, type])
    useEffect(() => {
        console.log(feed)
    },[feed])

    const subscriptions = useSelector(state => state.subscription);
    console.log(subscriptions)
    return (
        <>
            <div className="landing-page-container">
                <div className="landing-page-container__splash splash">
                    <ColOne type={type} info={feed[0]}/>
                    <ColTwo type={type} info={feed}/>
                    <ColThree/>
                </div>
            </div>
        {/* <InfiniteListWithVerticalScroll /> */}
        </>
    )
}