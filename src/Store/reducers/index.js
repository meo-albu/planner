import {combineReducers} from 'redux'
import {themeReducer} from './themeReducer'
import {loaderReducer} from './loaderReducer'
import {userReducer} from './userReducer'
import {sidebarReducer} from './sidebarReducer'
import {taskReducer} from './taskReducer'

const rootReducer = combineReducers({
  themeReducer,
  loaderReducer,
  userReducer,
  sidebarReducer,
  taskReducer
})

export default rootReducer