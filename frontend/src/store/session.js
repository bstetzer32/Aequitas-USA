import { csrfFetch } from './csrf';
import {getUserSubscriptions} from './subscriptions'
import {clearUserSubs} from './subscriptions'

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
// const SET_SUBS = 'session/setSubs';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

// const setSubs = (subs) => {
//   return {
//     type: SET_SUBS,
//     payload: subs,
//   };
// };

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const restoreUser = () => async dispatch => {
  const response1 = await csrfFetch('/api/session');
  let data = await response1.json();
  // data = await csrfFetch(`/api/subscriptions/${data.id}`)
  // const response2 = await data.json()
  dispatch(setUser(data.user));
  return response1;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const demologin = () => async (dispatch) => {
  const credential = 'demo@user.io'
  const password = 'password'
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  dispatch(clearUserSubs())
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const verify = (user) => async (dispatch) => {
  const { citizenId, addressLineOne, city, state, zip } = user;
  const response = await csrfFetch("/api/users/verify", {
    method: "POST",
    body: JSON.stringify({ citizenId, addressLineOne, city, state, zip }),
  });
  dispatch(getUserSubscriptions({id: Number.parseInt(citizenId)}))
  dispatch(restoreUser());
  return response;
};

// export const getSubscriptions = (subs) => async (dispatch) => {
//   const {id} = subs;
//   const response = await csrfFetch(`/api/subscriptions/${id}`);
//   const data = await response.json();
//   // console.log(data)
//   // data.regionSubs = data.regionSubs?.map(sub => sub.regions);
//   // data.officeSubs = data.officeSubs?.map(sub => sub.regions);
//   dispatch(setSubs(data));
//   return response;
// };

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    // case SET_SUBS:
    //   newState = Object.assign({}, state);
    //   newState.subs = action.payload;
    //   return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;