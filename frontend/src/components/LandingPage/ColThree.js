import React from "react";
import {Switch, Route} from "react-router-dom"
import Subscriptions from './utils/Subscriptions'
import {useSelector} from "react-redux";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from '../SignupFormModal'
import Offices from '../Offices'
import {useDispatch} from 'react-redux'
import * as sessionActions from '../../store/session'
import Regions from "../Regions";
import Topics from "../Topics";
import UserProbs from "../UserProbs";

export default function ColThree() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    function onClick() {
        dispatch(sessionActions.demologin())
    }
    return (
            <div className= "col col-3">
                <Switch>
                    <Route path='/regions/:regionId'>
                        <Offices />
                    </Route>
                    <Route path='/regions'>
                        <Regions />
                    </Route>
                    <Route path='/topics'>
                        <Topics />
                    </Route>
                    <Route path='/users'>
                        <UserProbs />
                    </Route>
                    <Route >
                {sessionUser ? <Subscriptions/> : 
                <div className='entry-landing'> 
                    <LoginFormModal/>
                    <SignupFormModal />
                    <div onClick={()=> onClick()} id='demo-div'>
                    Demo Login
                    </div> 
                </div>}
                </Route>
                </Switch>
            </div>
        )
}