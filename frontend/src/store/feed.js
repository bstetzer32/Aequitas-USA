import { csrfFetch } from './csrf';

const GET_ITEMS = 'feed/getItem'
const CLEAR_ITEMS = 'feed/clearItem'

const setItems = (items) => {
  return {
    type: GET_ITEMS,
    payload: items
  };
};

export const resetItems = () => {
    return {
        type: CLEAR_ITEMS
    }
}

export const getItems = (context, offset) => async (dispatch) => {
  const response = await csrfFetch("/api/feed/", {
    method: "POST",
    body: JSON.stringify({ context, offset }),
  });
  const data = await response.json();
  dispatch(setItems(data.feedData))
  return response;
};

export const getPageItems = (type, id, offset) => async (dispatch) => {
  const response = await csrfFetch(`/api/feed/${type}/${id}`, {
    method: "POST",
    body: JSON.stringify({ offset }),
  });
  const data = await response.json();
  dispatch(setItems(data.feedData))
  return response;
};



const initialState = [];

const feedReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ITEMS:
        newState = action.payload.length ? [...state, ...action.payload] : [...state];
        const result = []
        const map = new Map()
        for (const item of newState) {
            if (!map.has(item.id)) {
                map.set(item.id, true);
                result.push({
                    id: item.id,
                    title: item.title,
                    summary: item.summary,
                    description: item.description,
                    status: item.status,
                    citizenId: item.citizenId,
                    regionId: item.regionId,
                    topicId: item.topicId,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                })
            }
        }
        return result;
    case CLEAR_ITEMS:
        return newState = [];
    default:
      return state;
  }
};

export default feedReducer