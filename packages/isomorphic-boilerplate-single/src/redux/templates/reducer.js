import { FETCH_TEMPLATES_SUCCESS } from '../templates/actions'

const initState = {
  templates: [],
}

const templateReducer = (state = initState, action) => {
  if (action.type === FETCH_TEMPLATES_SUCCESS) {
    return {
      ...state,
      templates: action.payload,
    }
  }

  return state
}

export default templateReducer
