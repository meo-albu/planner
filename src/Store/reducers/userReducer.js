import types from '../actions/types'

const defaultState = {
  loggedIn: false,
  user: {}
}

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        user: action.payload.user
      }
    case types.LOGIN_USER:
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      }
    case types.LOGOUT_USER:
      return {
        ...state,
        loggedIn: false,
        user: {}
      }
    default:
      return state
  }
}