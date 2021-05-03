import { csrfFetch } from './csrf';

const POST_SOLUTION = 'problem/postSolution'

const postedSolution = () => {
    return {
        type: POST_SOLUTION
    }
}

export const postSolution = (solution) => async (dispatch) => {
    const response = await csrfFetch('/api/solution', {
    method: 'POST',
    body: JSON.stringify({
      solution
    })})
    const data = await response.json();
    dispatch(postedSolution())
    return data
}


const solutionReducer = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default solutionReducer