import {
  FETCH_RESUMES,
  FETCH_RESUME_BY_ID,
  ERROR,
  SUCCESS,
  CLEAR_STATUS,
  CLEAR_CURRENT_RESUME,
} from './actions'

const initState = {
  resumes: {
    resumes: [],
    count: 0,
  },
  currentResume: null,
  shouldFetchResumes: true,
  success: '',
  error: '',
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
    case SUCCESS:
      return {
        ...state,
        success: action.payload,
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case CLEAR_STATUS:
      return {
        ...state,
        error: '',
        success: '',
      }
    case CLEAR_CURRENT_RESUME:
      return {
        ...state,
        currentResume: null,
      }
    default:
      return state
  }
}

export default resumeReducer
