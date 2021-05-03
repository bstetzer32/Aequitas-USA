import { csrfFetch } from './csrf';

const POST_PRODUCT = 'problem/postProduct'

const postedProduct = () => {
    return {
        type: POST_PRODUCT
    }
}

export const postProduct = (product) => async (dispatch) => {
    const response = await csrfFetch('/api/problem', {
    method: 'POST',
    body: JSON.stringify({
      product
    })})
    const data = await response.json();
    dispatch(postedProduct())
    return data
}


const problemReducer = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default problemReducer