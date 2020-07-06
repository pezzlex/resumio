export const FETCH_TEMPLATES_SUCCESS = 'FETCH_TEMPLATES_SUCCESS'

export const fetchTemplates = (templates) => ({
  type: FETCH_TEMPLATES_SUCCESS,
  payload: templates,
})

// fetch templates
export const fetchTemplatesSuccess = (templates) => {
  return (dispatch) => {
    dispatch(fetchTemplates(templates))
  }
}
