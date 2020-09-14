import types from '../actions/types'

const defaultState = {
  tasks: []
}

export const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
    case types.SET_TASKS:
      return {
        ...state,
        tasks: action.payload
      }
    case types.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.id ? {...task, text: action.payload.text} : task)
      }
    case types.COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.id ? {...task, completed: true} : task)
      }
    case types.UNCOMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.id ? {...task, completed: false} : task)
      }
    case types.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.id)
      }
    default:
      return state
  }
}