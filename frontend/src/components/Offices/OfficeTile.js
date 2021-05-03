import React from "react";
// import {useSelector} from 'react-redux'

function OfficeTile({office}) {
    const leader = office.User
    console.log(office)
    return (
        <div className='office-tile'>
            <h3 className='office-tile__name'>{office?.name}</h3>
            <h4 className='office-tile__leader'>{leader?.firstName + ' ' + leader?.lastName}</h4>
            {!leader?.email.includes('placeholder') ? <h5 className='office-tile__email'>{leader?.email}</h5> : null}
        </div>
    )
}

export default OfficeTile