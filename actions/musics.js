import * as types from '../constants/ActionTypes'
import musicBuilder from '../services/music-builder'
import MusicData from '../services/music-data'
import getUser from '../services/account'

const data = new MusicData()

export const filterMusic = musics => term => ({
  type: types.FILTER_MUSIC,
  term,
  musics
})

export function getActiveEvent(dispatch) {
  return {
    type: types.GET_EVENT,
    promise: data.getActiveEvent(dispatch)
  }
}

export function favoriteMusic(event, music, user) {
  return {
    type: types.TOGGLE_FAVORITE,
    promise: data.favoriteMusic(event, music, user)
  }
}

export function addMusic(music) {
  return {
    type: types.ADD_MUSIC,
    promise: data.add(musicBuilder(music))
  }
}

export function editMusic(music) {
  return {
    type: types.UPDATE_MUSIC,
    promise: data.update(musicBuilder(music))
  }
}

export function toggleExecuted(music, event) {
  return {
    type: types.SET_EXECUTED_MUSIC,
    promise: data.toggleExecuted(musicBuilder(music), event)
  }
}

export function loadMusics(dispatch) {
  return {
    type: types.GET_MUSICS,
    promise: data.get(dispatch)
  }
}

export function login() {
  return {
    type: types.LOGIN_USER,
    promise: getUser(data)
  }
}
