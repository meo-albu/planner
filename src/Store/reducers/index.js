import {combineReducers} from 'redux'
import {themeReducer} from './themeReducer'
import {loaderReducer} from './loaderReducer'
import {userReducer} from './userReducer'
import {sidebarReducer} from './sidebarReducer'

const rootReducer = combineReducers({
  themeReducer,
  loaderReducer,
  userReducer,
  sidebarReducer
})

export default rootReducer