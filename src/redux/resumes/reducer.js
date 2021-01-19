import {
  FETCH_RESUMES,
  FETCH_RESUME_BY_ID,
  ERROR,
  SUCCESS,
  CLEAR_STATUS,
  CLEAR_CURRENT_RESUME,
  RENDER_RESUME,
} from './actions'

const initState = {
  resumes: {
    resumes: [],
    count: 0,
  },
  currentResume: {
    displayLink: '',
  },
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
    case RENDER_RESUME:
      return {
        ...state,
        currentResume: { ...state.currentResume, ...action.payload },
      }
    default:
      return state
  }
}

export default resumeReducer
