import types from './types'

export const setUser = (user) => {
  return {
    type: types.SET_USER,
    payload: {
      loggedIn: true,
      user
    }
  }
}

export const loginUser = (user) => {
  return {
    type: types.LOGIN_USER,
    payload: user
  }
}

export const logoutUser = () => {
  return {
    type: types.LOGOUT_USER,
  }
}