// import React, {useEffect, useState} from 'react'
// import emailjs from 'emailjs-com';


// function SendEmail () {
//     const [buttonState, setButtonState] = useState(false)
//   const [title, setTitle] = useState("");
//     useEffect(() => {
//         sendEmail()
//     }, [buttonState])
//     const sendEmail = () => { 
//         const templateParams = {
//         toEmail: 'benstetzer@gmail.com',
//         toName: 'James',
//         fromName: 'Bob',
//         positionName: 'head honcho',
//         levelName: 'turf',
//         officeName: 'blue side crew',
//         verificationCode: '1337',
//         citizenEmail: 'benstetzer@icloud.com'
//         };

//         emailjs.send("service_rxuikoi","template_sphrrc9", templateParams, 'user_sXFtmGNeamEzTqj2H1al0');
//         // alert('email sent!')
//     };

//     return (
//         <form>
//             <label>
//                 <h2>Title</h2>
//                 <input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                 />
//       </label>
//             <button onClick={()=> prevButtonState => setButtonState(!prevButtonState)}>Send Ben an Email!</button>
//         </form>
//     )

// }

// export default SendEmail