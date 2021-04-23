import {csrfFetch} from './csrf'

const POST_SESSION = 'session/postSession'
const REMOVE_SESSION = 'session/removeSession'

const postSession = (user)=>{
    return {type: POST_SESSION, user}
}

export const removeSession = ()=>{
    return {type: REMOVE_SESSION}
}

export const postSessionThunk = data => async dispatch => {
    const response = await csrfFetch('/api/session', {method: 'POST', body: JSON.stringify(data)})
    if (response.ok) {
        const user = await response.json();
        dispatch(postSession(user));
        return user;
    }
}

const initialState = { user: null};

const sessionReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case POST_SESSION:
            newState.user = action.user.user;
            return newState;
        case REMOVE_SESSION:
            newState.user = null;
            return newState
        default:
            return state;
    }
}

export default sessionReducer