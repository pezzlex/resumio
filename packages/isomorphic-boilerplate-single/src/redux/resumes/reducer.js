import { FETCH_RESUMES_SUCCESS } from '../resumes/actions'

const initState = {
  resumes: [],
}

const resumeReducer = (state = initState, action) => {
  // console.log('here => ', state, action)
  if (action.type === FETCH_RESUMES_SUCCESS) {
    return {
      ...state,
      resumes: action.payload,
    }
  }

  return state
}

export default resumeReducer
