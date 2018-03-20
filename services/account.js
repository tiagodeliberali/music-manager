import firebase from 'firebase'

const connectWithUser = (user, dbUser, onConnect) => {
  const result = Object.assign(
    {},
    dbUser,
    { displayName: user.displayName, photoURL: user.photoURL }
  )

  result.canEdit = () => dbUser && (dbUser.admin || dbUser.author)

  result.canRead = () => dbUser // && (dbUser.admin || dbUser.author || dbUser.reader)

  result.canVote = () => dbUser && (dbUser.admin || dbUser.author || dbUser.reader)

  onConnect(result)
}

export default (db, onConnect) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().languageCode = 'pt_BR';

  firebase.auth().signInWithPopup(provider)
    .then(({ user }) => {
      db.getUser(user.email).then((dbUser) => {
        if (!dbUser)
          db.addUser(user.email, user.displayName, user.photoURL)
            .then(newDbUser => connectWithUser(user, newDbUser, onConnect))
        else
          connectWithUser(user, dbUser, onConnect)
      })
    })
    .catch((error) => {
      console.log(error)
    });
}
