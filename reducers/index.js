import { combineReducers } from 'redux'
import activeEvent from './activeEvent'
import filteredMusics from './filteredMusics'
import musics from './musics'
import user from './user'

const rootReducer = combineReducers({
  activeEvent,
  filteredMusics,
  musics,
  user
})

export default rootReducer;
