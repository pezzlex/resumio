import axios from 'axios'

export const FETCH_TEMPLATES = 'FETCH_TEMPLATES'

export const fetchTemplates = (templates) => ({
  type: FETCH_TEMPLATES,
  payload: templates,
})

// fetch templates
export const fetchTemplatesSuccess = (templates) => {
  return (dispatch) => {
    dispatch(fetchTemplates(templates))
  }
}
