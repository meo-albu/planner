import types from '../actions/types'

const project = localStorage.getItem('project')

const defaultState = {
  projects: [],
  openedProject: project ? JSON.parse(project) : null
}

export const projectReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      }
    case types.SET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      }
    case types.EDIT_PROJECT:
      return {
        ...state,
        projects: state.projects.map(project => project.id === action.payload.id ? {...project, title: action.payload.title} : project)
      }
    case types.REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload.id)
      }
    case types.OPEN_PROJECT:
       const project = state.projects.find(project => project.projectId === action.payload.id)
       localStorage.setItem('project', JSON.stringify(project))
      return {
        ...state,
        openedProject: project
      }
    case types.CLOSE_PROJECT:
       localStorage.removeItem('project')
      return {
        ...state,
        openedProject: null
      }
    default:
      return state
  }
}