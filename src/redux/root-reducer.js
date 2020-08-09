import App from '../redux/app/reducer'
import Auth from '../redux/auth/reducer'
import resumeData from './resumes/reducer'
import { combineReducers } from 'redux'

export default combineReducers({
  Auth,
  App,
  resumeData,
})
