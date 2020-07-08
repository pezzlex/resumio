import { FETCH_TEMPLATES } from '../templates/actions'

const initState = {
  templates: [],
  shouldFetchTemplates: true,
}

const templateReducer = (state = initState, action) => {
  if (action.type === FETCH_TEMPLATES) {
    return {
      ...state,
      templates: action.payload,
      shouldFetchTemplates: false,
    }
  }

  return state
}

export default templateReducer
