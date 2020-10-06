import types from '../actions/types'

const defaultState = {
  tasks: false,
  calendar: false,
  userSettings: false,
  weather: true
}

export const sidebarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.OPEN_TASKS:
      return {
        ...state,
        tasks: true
      }
    case types.CLOSE_TASKS:
      return {
        ...state,
        tasks: false
      }
    case types.OPEN_CALENDAR:
      return {
        ...state,
        calendar: true
      }
    case types.CLOSE_CALENDAR:
      return {
        ...state,
        calendar: false
      }
    case types.OPEN_USER_SETTINGS:
      return {
        ...state,
        userSettings: true
      }
    case types.CLOSE_USER_SETTINGS:
      return {
        ...state,
        userSettings: false
      }
    case types.OPEN_WEATHER:
      return {
        ...state,
        weather: true
      }
    case types.CLOSE_WEATHER:
      return {
        ...state,
        weather: false
      }
    default:
      return state
  }
}