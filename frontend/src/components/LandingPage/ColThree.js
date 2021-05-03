import React from "react";
import Subscriptions from './utils/Subscriptions'
import {useSelector} from "react-redux";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from '../SignupFormModal'
import {useDispatch} from 'react-redux'
import * as sessionActions from '../../store/session'

export default function ColThree() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    function onClick() {
        dispatch(sessionActions.demologin())
    }
    return (
            <div className= "col col-3">
                {sessionUser ? <Subscriptions/> : 
                <div className='entry-landing'> 
                    <LoginFormModal/>
                    <SignupFormModal />
                    <div onClick={()=> onClick()} id='demo-div'>
                    Demo Login
                    </div> 
                </div>}
            </div>
        )
}