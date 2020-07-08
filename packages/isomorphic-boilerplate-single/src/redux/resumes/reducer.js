import { FETCH_RESUMES } from '../resumes/actions'

const initState = {
  resumes: [],
  shouldFetchResumes: true,
}

const resumeReducer = (state = initState, action) => {
  if (action.type === FETCH_RESUMES) {
    return {
      ...state,
      resumes: action.payload,
      shouldFetchResumes: false,
    }
  }

  return state
}

export default resumeReducer
