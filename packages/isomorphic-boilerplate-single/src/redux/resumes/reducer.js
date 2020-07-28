import { FETCH_RESUMES, FETCH_RESUME_BY_ID } from '../resumes/actions'

const initState = {
  resumes: [],
  currentResume: null,
  shouldFetchResumes: true,
}

const resumeReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_RESUMES:
      return {
        ...state,
        resumes: action.payload,
        shouldFetchResumes: false,
      }
    case FETCH_RESUME_BY_ID:
      return {
        ...state,
        currentResume: action.payload,
      }
    default:
      return state
  }
}

export default resumeReducer
