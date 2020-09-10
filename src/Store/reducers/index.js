import {combineReducers} from 'redux'
import {themeReducer} from './themeReducer'
import {loaderReducer} from './loaderReducer'
import {userReducer} from './userReducer'

const rootReducer = combineReducers({
  themeReducer,
  loaderReducer,
  userReducer
})

export default rootReducer