import types from '../actions/types'

const project = localStorage.getItem('project')

const defaultState = {
  projects: [],
  openedProject: project ? JSON.parse(project) : null
}
let newProject = {}
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
      newProject = {
            ...state.openedProject,
            title: action.payload.title
         }
      localStorage.setItem('project', JSON.stringify(newProject))
      return {
        ...state,
        projects: state.projects.map(project => project.projectId === action.payload.id ? {...project, title: action.payload.title} : project),
        openedProject: newProject
      }
    case types.ADD_STAGE:
      newProject = {
            ...state.openedProject,
            stages: [...state.openedProject.stages, action.payload.stage]
         }
      localStorage.setItem('project', JSON.stringify(newProject))
      return {
         ...state,
         projects: state.projects.map(project => project.projectId === action.payload.id ? newProject : project),
         openedProject: {
            ...state.openedProject,
            stages: newProject.stages
         }
      }
    case types.ADD_CARD:
      newProject = {
            ...state.openedProject,
            stages: state.openedProject.stages.map(stage => stage.stageId === action.payload.stageId ? {...stage, cards: [...stage.cards, action.payload.card]} : stage)
         }
      localStorage.setItem('project', JSON.stringify(newProject))
      return {
         ...state,
         projects: state.projects.map(project => project.projectId === action.payload.projectId ? newProject : project),
         openedProject: {
            ...state.openedProject,
            stages: newProject.stages
         }
      }
    case types.REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => project.projectId !== action.payload.id)
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