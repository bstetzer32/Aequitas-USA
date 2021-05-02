import React, { useEffect }from "react";
import {useLocation} from "react-router-dom"
import ColOne from './ColOne'
import ColTwo from './ColTwo'
import ColThree from './ColThree'
import {useSelector, useDispatch} from 'react-redux'
import './LandingPage.css'
// import Feed from './utils/Feed';
// import InfiniteListWithVerticalScroll from './utils/ScrollBox';
import { useParams } from "react-router-dom";
// import * as subActions from "../../store/subscriptions";
import * as feedActions from "../../store/feed";


// const date = new Date();
// const a = {
//     title: 'Title Goes Here',
//     summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In metus ligula, luctus vitae venenatis auctor, luctus sed justo. Curabitur convallis nunc eget lacinia aliquam.',
//     region: 'U.S.A.',
//     topic: 'Community',
//     highlight: 23,
//     date: date.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' }),
//     img: 'https://i.stack.imgur.com/y9DpT.jpg'
// }

export default function LandingPage ({type}) {

    const location = useLocation();
    const feed = useSelector(state => state.feed)
    
    const sessionUser = useSelector(state => state.session.user);
    const sessionSubs = useSelector(state => state.subscriptions);
    const {id} = useParams()
    console.log (sessionUser, sessionSubs)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(feedActions.resetItems())
    },[dispatch, location])
    const context = sessionUser? sessionUser.id : 1
    useEffect(() => {
        if (id === undefined) {
            // console.log(sessionSubs)
            dispatch(feedActions.getItems(context, 0))
        } else {
            dispatch(feedActions.getPageItems(type, id, 0))

        }
    },[context, dispatch, id, sessionSubs, type, location])
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