export const colors = {
  blue: {
    deep: 'rgb(0, 121, 191)',
    light: 'lightblue',
    lighter: '#d9fcff',
    soft: '#E6FCFF',
  },
  black: '#4d4d4d',
  shadow: 'rgba(0,0,0,0.2)',
  grey: {
    darker: '#C1C7D0',
    dark: '#E2E4E6',
    medium: '#DFE1E5',
    N30: '#EBECF0',
    light: '#F4F5F7',
  },
  green: 'rgb(185, 244, 188)',
  white: 'white',
  purple: 'rebeccapurple',
  orange: '#FF991F',
}
export const grid = 8

export const borderRadius = 2
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
}
const colStyle = {
  marginBottom: '16px',
}
const gutter = 16

const basicStyle = {
  rowStyle,
  colStyle,
  gutter,
}
export default basicStyle
