import ColOne from './ColOne'
import ColTwo from './ColTwo'
import ColThree from './ColThree'
import './LandingPage.css'


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
    return (
    <div className="landing-page-container">
        <div className="landing-page-container__splash splash">
            <ColOne type={type} a={a}/>
            <ColTwo type={type} a={a}/>
            <ColThree type={type} a={a}/>
        </div>
    </div>
    )
}