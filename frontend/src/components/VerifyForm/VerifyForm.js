import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './VerifyForm.css';

function VerifyFormPage({setModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [addressLineOne, setAddressLineOne] = useState("");
  const [addressLineTwo, setAddressLineTwo] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [zip, setZip] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const upload = { citizenId: sessionUser.id, addressLineOne, city, state: stateCode, zip}
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.verify(upload))
      .then(() => {
          setModal(false)
      })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Verify Your Address</h1>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Address Line One
        <input
          type="text"
          value={addressLineOne}
          onChange={(e) => setAddressLineOne(e.target.value)}
          required
        />
      </label>
      <label>
        Address Line Two
        <input
          type="text"
          value={addressLineTwo}
          onChange={(e) => setAddressLineTwo(e.target.value)}
        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value)}
          required
        />
      </label>
      <label>
        ZIP Code
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Verify Account</button>
    </form>
  );
}

export default VerifyFormPage;