import ColOne from './ColOne'
import ColTwo from './ColTwo'
import ColThree from './ColThree'
import './LandingPage.css'
import { Route, Switch } from "react-router-dom";


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

export default function LandingPage ({region}) {
    return (
        <>
            <div className="landing-page-container">
                <h1>{region}</h1>
                <div className="landing-page-container__splash splash">
                    <ColOne type={region} a={a}/>
                    <ColTwo type={region} a={a}/>
                    <ColThree/>
                </div>
            </div>

        </>
    )
}