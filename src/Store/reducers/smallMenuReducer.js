import types from '../actions/types'

const defaultState = {
  opened: false,
  coordinates: null
}

export const smallMenuReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.OPEN_SMALLMENU:
      return {
        opened: true,
        coordinates: action.payload
      }
    case types.CLOSE_SMALLMENU:
      return {
        opened: false,
        coordinates: null
      }
    default:
      return state
  }
}