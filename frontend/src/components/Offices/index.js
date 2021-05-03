import React, { useEffect }from "react";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import OfficeTile from './OfficeTile'
import './Offices.css'
import * as subscriptionAcions from '../../store/subscriptions'
import VerifyFormModal from '../VerifyForm'

function NoOffices({region}) {
    const user = useSelector(state => state.session.user)
    return (
        <div className='office-no'>
            <h3>Doesnt look like any users from {region?.name} have verified their account. Offices in {region?.name} will populate when a denizen of this region verifies their account.</h3>
            {user?.authenticated ? 
                <><h3>
                    Are you from {region?.name}? click below to verify your account
                </h3> 
                <VerifyFormModal /></>
            : null}
        </div>
    )
}
function Offices() {
    const {regionId} = useParams()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(subscriptionAcions.getPageSubscriptions(regionId))
    },[dispatch, regionId])
    console.log(regionId)
    const offices = useSelector(state => state.subscription.pageSubs)
    const region = useSelector(state => state.subscription.pageNames?.regions[parseInt(regionId) - 1]);
    return (
        <div className='office-container'>
            <div className='office-header' >
                <h2>{offices?.length ? `Offices in ${region?.name}` : null}</h2>
            </div>
            <div className='office-tiles'>
                {offices?.length ? offices?.map((office, i) => <OfficeTile key={`office-${i}`} office={office}/>) : <NoOffices region={region}/>}
            </div>
        </div>
    )
}

export default Offices