import { csrfFetch } from './csrf';
const SET_USER_SUBS = 'session/setUserSubs';
const SET_PAGE_SUBS = 'session/setPageSubs';
const SET_PAGE_NAMES = 'session/setPageNames';
const CLEAR_USER_SUBS = 'session/clearUserSubs';

const setPageNames = (names) => {
  return{
    type: SET_PAGE_NAMES,
    payload: names
  }
}

const setUserSubs = (subs) => {
  return {
    type: SET_USER_SUBS,
    payload: subs,
  };
};
export const clearUserSubs = () => {
  return {
    type: CLEAR_USER_SUBS
  }
}

const setPageSubs = (subs) => {
  return {
    type: SET_PAGE_SUBS,
    payload: subs,
  };
};

export const getPageNames = () => async (dispatch) => {
  const response = await csrfFetch('/api/subscriptions/')
  const data = await response.json();
  dispatch(setPageNames(data))
  return response
}


export const getUserSubscriptions = (subs) => async (dispatch) => {
  const {id} = subs;
  const response = await csrfFetch(`/api/subscriptions/${id}`);
  const data = await response.json();
  dispatch(setUserSubs(data));
  return response;
};
export const getPageSubscriptions = (subs) => async (dispatch) => {
  const {page, id} = subs;
  const response = await csrfFetch(`/api/${page}/${id}`);
  const data = await response.json();
  dispatch(setPageSubs(data));
  return response;
}
const initialState = { pageNames: null, userSubs: null, pageSubs: null };

const subscriptionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CLEAR_USER_SUBS: 
      newState = Object.assign({}, state);
      newState.userSubs = null
      return newState
    case SET_PAGE_NAMES:
      newState = Object.assign({}, state);
      newState.pageNames = action.payload;
      return newState;
    case SET_USER_SUBS:
      newState = Object.assign({}, state);
      newState.userSubs = action.payload;
      return newState;
    case SET_PAGE_SUBS:
      newState = Object.assign({}, state);
      newState.pageSubs = action.payload;
      return newState;
    default:
      return state;
  }
};

export default subscriptionReducer