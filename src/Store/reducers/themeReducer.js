import types from '../actions/types'
import {darkTheme, lightTheme} from '../../theme'

!localStorage.getItem('darkTheme') && localStorage.setItem('darkTheme', false)

const defaultState = {
  darkTheme: JSON.parse(localStorage.getItem('darkTheme')),
  theme: JSON.parse(localStorage.getItem('darkTheme')) ? darkTheme : lightTheme
}

export const themeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.DARK_THEME:
      localStorage.setItem('darkTheme', true)
      return {
        ...state,
        darkTheme: true,
        theme: action.payload
      }
    case types.LIGHT_THEME:
      localStorage.setItem('darkTheme', false)
      return {
        ...state,
        darkTheme: false,
        theme: action.payload
      }
    default:
      return state
  }
}