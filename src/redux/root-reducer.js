import App from './app/reducer'
import Auth from './auth/reducer'
import resumeData from './resumes/reducer'
import { combineReducers } from 'redux'

console.log('process.env', process.env)

export default combineReducers({
  Auth,
  App,
  resumeData,
})
