import types from './types'
import {darkTheme, lightTheme} from '../../theme'

export const setDarkTheme = () => {
  return {
    type: types.DARK_THEME,
    payload: darkTheme
  }
}

export const setLightTheme = () => {
  return {
    type: types.LIGHT_THEME,
    payload: lightTheme
  }
}