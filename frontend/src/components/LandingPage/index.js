import './LandingPage.css'

export default function LandingPage () {
    return (
    <div className="landing-page-container">
        <div className="landing-page-container__splash splash">
            <div className="col col-1 col-main">
                <img className='col-main__img-main' alt='main' src='https://i.stack.imgur.com/y9DpT.jpg'></img>
            </div>
            <div className= "col col-2">
                column 2
            </div>
            <div className= "col col-3">
                column 3
            </div>
        </div>
    </div>
    )
}