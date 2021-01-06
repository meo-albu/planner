import {combineReducers} from 'redux'
import {themeReducer} from './themeReducer'
import {loaderReducer} from './loaderReducer'
import {userReducer} from './userReducer'
import {sidebarReducer} from './sidebarReducer'
import {taskReducer} from './taskReducer'
import {projectReducer} from './projectReducer'
import {smallMenuReducer} from './smallMenuReducer'

const rootReducer = combineReducers({
  themeReducer,
  loaderReducer,
  userReducer,
  sidebarReducer,
  taskReducer,
  projectReducer,
  smallMenuReducer
})

export default rootReducer