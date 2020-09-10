import types from '../actions/types'

const defaultState = {
  loading: false
}

export const loaderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_LOADER:
      return {
        loading: true
      }
    case types.STOP_LOADER:
      return {
        loading: false
      }
    default:
      return state
  }
}