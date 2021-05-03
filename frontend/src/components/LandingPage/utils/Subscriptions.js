import React from "react";
import GovtTile from "./GovtTile";
import {useSelector, useDispatch} from 'react-redux'
import VerifyForm from '../../VerifyForm'
import * as sessionActions from "../../../store/session";


function NoSubs() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    function onClick() {
        const user = { citizenId: sessionUser.id, addressLineOne: '825 Battery St', city: 'San Francisco', state: 'CA', zip: '94111' }
        dispatch(sessionActions.verify(user))
    }

    return (
        <div className='no-subs' >
            <div className='no-subs__header'>
                <h2>This is where you can view you federal, state, and county government regions once you verify your address.</h2>
            </div>
            <VerifyForm />
            <div onClick={()=> onClick()} id='demo-div'>
                    Demo Verification
            </div> 
        </div>
    )
}


function Subscriptions({name}) {
  const regionSubs = useSelector(state => state.subscription?.userSubs?.regionSubs);

    
    return(
            <div className='government'>
                <div className='government__header'>
                    <h2>Your Government</h2>
                </div>
                <div className='government__tiles'>
                    {regionSubs?.length ? regionSubs.map((region, i) => <GovtTile region={region} key={`region-${i}`}  />) : <NoSubs/>}
                </div>
            </div>
    )
}

export default Subscriptions