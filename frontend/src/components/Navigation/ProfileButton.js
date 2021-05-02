import React from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import VerifyFormModal from "../VerifyForm";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div id='profile-dropdown-logged'>
      <li>
        <h3>Your Info</h3>
            <ul id="userInfo">
                <li><b>Username:</b> {user.username}</li>
                <li><b>Email:</b> {user.email}</li>
                <li><b>Status:</b> {user.authenticated ? 'Verified Citizen' : 'Unverified'}</li>
            </ul>
      </li>
          <li onClick={logout}>Log Out</li>
          {!user.authenticated && (<VerifyFormModal />)}
      </div>
      
  )
}

export default ProfileButton;