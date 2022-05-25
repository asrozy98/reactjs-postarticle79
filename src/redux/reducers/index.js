import { combineReducers } from 'redux'
import ArticlesReducer from './Articles'
import SidebarReducer from './Sidebar'

export default combineReducers({
  ArticlesReducer,
  SidebarReducer,
})
