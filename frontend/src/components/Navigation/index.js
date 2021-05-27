import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DropdownMenu from './DropdownMenu'
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';
import ProbFormModal from '../ProbFormModal';
// import '../images/aelogo.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }
// 


  return (
    <div className='header-container'>
      <div className='header-logo'><Link to='/'><img alt='logo' src='https://imgur.com/ldLHZpq.png'></img></Link></div>
      <div></div>
      <div className='icon-container'>
        <DropdownMenu buttonClass='fas fa-user-circle'>
          {isLoaded && sessionLinks} 
        </DropdownMenu>
        <DropdownMenu buttonClass='fas fa-bars'>
            {sessionUser? <ProbFormModal /> : null}
            {/* <li><NavLink to="/leaders">Leaders</NavLink></li> */}
            <li><NavLink to="/topics">Topics</NavLink></li>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Navigation;
