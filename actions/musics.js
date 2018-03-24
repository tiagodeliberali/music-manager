import * as types from '../constants/ActionTypes'
import musicBuilder from '../services/music-builder'

export function filterMusic(term, musics) {
  return {
    type: types.FILTER_MUSIC,
    term,
    musics
  }
}

export function getActiveEvent(data) {
  return {
    type: types.GET_EVENT,
    promise: data.getActiveEvent()
  }
}

export function favoriteMusic(data, event, music, user) {
  return {
    type: types.TOGGLE_FAVORITE,
    promise: data.favoriteMusic(event, music, user)
  }
}

export function addMusic(data) {
  return {
    type: types.GET_EVENT,
    promise: data.add(musicBuilder(data.music))
  }
}

export function editMusic(data) {
  return {
    type: types.GET_EVENT,
    promise: data.update(musicBuilder(data.music))
  }
}

export function loadMusics(musics) {
  return {
    type: types.GET_MUSICS,
    musics
  }
}

export function user(data) {
  return {
    type: types.LOGIN_USER,
    promise: data.login()
  }
}
