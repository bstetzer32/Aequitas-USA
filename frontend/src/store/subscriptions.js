import { csrfFetch } from './csrf';
const SET_USER_SUBS = 'session/setUserSubs';
const SET_PAGE_SUBS = 'session/setPageSubs';
const setUserSubs = (subs) => {
  return {
    type: SET_USER_SUBS,
    payload: subs,
  };
};
const setPageSubs = (subs) => {
  return {
    type: SET_PAGE_SUBS,
    payload: subs,
  };
};
export const getUserSubscriptions = (subs) => async (dispatch) => {
  const {id} = subs;
  const response = await csrfFetch(`/api/subscriptions/${id}`);
  const data = await response.json();
  // console.log(data)
  // data.regionSubs = data.regionSubs?.map(sub => sub.regions);
  // data.officeSubs = data.officeSubs?.map(sub => sub.regions);
  dispatch(setUserSubs(data));
  return response;
};
export const getPageSubscriptions = (subs) => async (dispatch) => {
  const {page, id} = subs;
  const response = await csrfFetch(`/api/${page}/${id}`);
  const data = await response.json();
  // console.log(data)
  // data.regionSubs = data.regionSubs?.map(sub => sub.regions);
  // data.officeSubs = data.officeSubs?.map(sub => sub.regions);
  dispatch(setPageSubs(data));
  return response;
}
const initialState = { userSubs: null, pageSubs: null };

const subscriptionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
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