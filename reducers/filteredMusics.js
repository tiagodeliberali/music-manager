import { FILTER_MUSIC } from '../constants/ActionTypes';

const initialState = []
let lowerTerm = ''

export default function filteredMusics(state = initialState, action) {
  switch (action.type) {
    case FILTER_MUSIC:
      lowerTerm = (action.term || '').toLowerCase()

      return action.musics.filter(music =>
        (music.name || '').toLowerCase().indexOf(lowerTerm) > -1
        || (music.lyrics || '').toLowerCase().indexOf(lowerTerm) > -1)

    default:
      return state;
  }
}
