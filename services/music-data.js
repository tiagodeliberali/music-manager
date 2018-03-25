import firebase from 'firebase'
import { SNAPSHOT_EVENT, FILTER_MUSIC, SNAPSHOT_MUSICS } from '../constants/ActionTypes'

require('firebase/firestore')

class MusicData {
  constructor() {
    const config = {
      apiKey: "AIzaSyCWVYRQNYFCyo9IvwriI67rBjDtQzgE1o4",
      authDomain: "music-manager-imel.firebaseapp.com",
      databaseURL: "https://music-manager-imel.firebaseio.com",
      projectId: "music-manager-imel",
      storageBucket: "music-manager-imel.appspot.com",
      messagingSenderId: "368925371346"
    }

    firebase.initializeApp(config)
    this.db = firebase.firestore()
    this.musicCollection = this.db.collection('musics')
    this.userCollection = this.db.collection('users')
    this.eventCollection = this.db.collection('events')
  }

  getActiveEvent = async (dispatch) => {
    try {
      const events = await this.eventCollection.get()
      const result = []

      events.forEach((doc) => {
        result.push(Object.assign({}, doc.data(), { id: doc.id }))
      })

      const activeEvent = result.filter(event => event.active)[0]

      this.eventCollection
        .doc(activeEvent.id)
        .collection('musics')
        .onSnapshot(async (musicList) => {
          const currentEvent = { id: activeEvent.id }
          currentEvent.musics = this.getMusicsFromEvent(musicList)

          dispatch({ type: SNAPSHOT_EVENT, payload: currentEvent });
        })
    } catch (err) {
      console.log(err)
    }
  }

  getMusicsFromEvent = (musicList) => {
    try {
      const result = []

      musicList.forEach((doc) => {
        result.push(Object.assign({}, doc.data(), { id: doc.id }))
      })

      return result
    } catch (err) {
      console.log(err)
    }
  }

  favoriteMusic = async (event, music, user) => {
    try {
      const eventMusicCollection = this.eventCollection.doc(event.id).collection('musics')
      const eventMusic = await eventMusicCollection.doc(music.id).get()
      const eventMusicData = eventMusic.data()

      if (!eventMusicData)
        await eventMusicCollection.doc(music.id).set({ name: music.name, votes: [user.id] })
      else {
        const votes = eventMusicData.votes || [];

        if (votes.find(vote => vote === user.id))
          await eventMusicCollection.doc(music.id)
            .set({ name: music.name, votes: votes.filter(vote => vote !== user.id) })
        else
          await eventMusicCollection.doc(music.id)
            .set({ name: music.name, votes: votes.concat(user.id) })
      }
    } catch (err) {
      console.log(err)
    }
  }

  getUser = async (id) => {
    try {
      const user = await this.userCollection.doc(id).get()
      const userData = user.data()

      if (userData)
        return Object.assign({}, userData, { id })

      return undefined
    } catch (err) {
      console.log(err)
    }
  }

  addUser = async (email, displayName, photoURL) => {
    try {
      const user = {
        email,
        displayName,
        photoURL,
        admin: false,
        author: false,
        reader: true // TODO: move back to false
      }

      await this.userCollection.doc(email).set(user)
      return Object.assign({}, user, { id: email })
    } catch (err) {
      console.log(err)
    }
  }

  get = async (dispatch) => {
    try {
      this.musicCollection.onSnapshot(async (musicList) => {
        const musics = this.getMusicsFromEvent(musicList)

        dispatch({ type: SNAPSHOT_MUSICS, payload: musics })
        dispatch({ type: FILTER_MUSIC, musics })
      })
    } catch (err) {
      console.log(err)
    }
  }

  add = async (music) => {
    try {
      const added = await this.musicCollection.add(music)
      return Object.assign({}, music, { id: added.id })
    } catch (err) {
      console.log(err)
    }
  }

  update = async (music) => {
    try {
      await this.musicCollection.doc(music.id).set(music)
      return Object.assign({}, music)
    } catch (err) {
      console.log(err)
    }
  }
}

export default MusicData
