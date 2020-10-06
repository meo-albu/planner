import types from './types'

export const openTasks = () => {
  return {
    type: types.OPEN_TASKS
  }
}

export const closeTasks = () => {
  return {
    type: types.CLOSE_TASKS
  }
}

export const openCalendar = () => {
  return {
    type: types.OPEN_CALENDAR
  }
}

export const closeCalendar = () => {
  return {
    type: types.CLOSE_CALENDAR
  }
}

export const openUserSettings = () => {
  return {
    type: types.OPEN_USER_SETTINGS
  }
}

export const closeUserSettings = () => {
  return {
    type: types.CLOSE_USER_SETTINGS
  }
}

export const openWeather = () => {
  return {
    type: types.OPEN_WEATHER
  }
}

export const closeWeather = () => {
  return {
    type: types.CLOSE_WEATHER
  }
}