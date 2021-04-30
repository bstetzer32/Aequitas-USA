import { csrfFetch } from './csrf';

const GET_ITEMS = 'feed/getItem'

const setItems = (items) => {
  return {
    type: GET_ITEMS,
    payload: items,
  };
};

export const getItems = (context, offset) => async (dispatch) => {
  const response = await csrfFetch("/api/feed/", {
    method: "POST",
    body: JSON.stringify({ context, offset }),
  });
  const data = await response.json();
  dispatch(setItems(data))
  return response;
};

const initialState = [];

const feedReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ITEMS:
      newState = [...state, action.payload];
      return newState;
    default:
      return state;
  }
};

export default feedReducer