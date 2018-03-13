import firebase from 'firebase'
require('firebase/firestore')

const collectionName = 'musics'

class MusicData {
    constructor() {
        var config = {
            apiKey: "AIzaSyCWVYRQNYFCyo9IvwriI67rBjDtQzgE1o4",
            authDomain: "music-manager-imel.firebaseapp.com",
            databaseURL: "https://music-manager-imel.firebaseio.com",
            projectId: "music-manager-imel",
            storageBucket: "music-manager-imel.appspot.com",
            messagingSenderId: "368925371346"
        }
        
        firebase.initializeApp(config)
        this.db = firebase.firestore()
        this.musicCollection = this.db.collection(collectionName)
    }

    get = async () => {
        try {
            const musicList = await this.musicCollection.get()
            const result = []

            musicList.forEach((doc) => {
                result.push(Object.assign({}, doc.data(), { id: doc.id }))
            })

            return result
        }
        catch (err) {
            console.log(err)
        }
    }

    add = async (music) => {
        try {
            const added = await this.musicCollection.add(music)
            return Object.assign({}, music, { id: added.id })
        }
        catch (err) {
            console.log(err)
        }
    }

    update = async (music) => {
        try {
            await this.musicCollection.doc(music.id).set(music)
            return Object.assign({}, music)
        }
        catch (err) {
            console.log(err)
        }
    }
}

export default MusicData