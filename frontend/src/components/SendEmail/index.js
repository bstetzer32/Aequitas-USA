import React, {useEffect, useState} from 'react'
import emailjs from 'emailjs-com';


function SendEmail () {
    const [buttonState, setButtonState] = useState(false)
    useEffect(() => {
        sendEmail()
    }, [buttonState])
    const sendEmail = () => { 
        const templateParams = {
        toEmail: 'benstetzer@gmail.com',
        toName: 'James',
        fromName: 'Bob',
        positionName: 'head honcho',
        levelName: 'turf',
        officeName: 'blue side crew',
        verificationCode: '1337',
        citizenEmail: 'benstetzer@icloud.com'
        };

        emailjs.send("service_rxuikoi","template_sphrrc9", templateParams, 'user_sXFtmGNeamEzTqj2H1al0');
        console.log('email sent!')
    };

    return (
        <>
            <button onClick={()=> prevButtonState => setButtonState(!prevButtonState)}>Send Ben an Email!</button>
        </>
    )

}

export default SendEmail