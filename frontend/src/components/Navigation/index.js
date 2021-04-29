import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DropdownMenu from './DropdownMenu'
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';

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



  return (
    <div className='header-container'>
      <div className='logo-text'>Aequitas-USA</div>
      <div className='icon-container'>
        <DropdownMenu buttonClass='fas fa-user-circle'>
          {isLoaded && sessionLinks} 
        </DropdownMenu>
        <DropdownMenu buttonClass='fas fa-bars'>
            <li><NavLink to="/problems">Problems</NavLink></li>
            <li><NavLink to="/solutions">Solutions</NavLink></li>
            <li><NavLink to="/leaders">Leaders</NavLink></li>
            <li><NavLink to="/regions">Regions</NavLink></li>
            <li><NavLink to="/topics">Topics</NavLink></li>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Navigation;