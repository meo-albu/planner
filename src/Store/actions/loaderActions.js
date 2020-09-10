import types from './types'

export const setLoader = () => {
  return {
    type: types.SET_LOADER
  }
}

export const stopLoader = () => {
  return {
    type: types.STOP_LOADER
  }
}