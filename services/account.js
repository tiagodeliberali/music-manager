import firebase from 'firebase'

const buildUser = (user, dbUser) => {
  const result = Object.assign(
    {},
    dbUser,
    { displayName: user.displayName, photoURL: user.photoURL }
  )

  result.canEdit = () => dbUser && (dbUser.admin || dbUser.author)
  result.canRead = () => !!dbUser // && (dbUser.admin || dbUser.author || dbUser.reader)
  result.canVote = () => dbUser && (dbUser.admin || dbUser.author || dbUser.reader)

  return result
}

export default async (db) => {
  try {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().languageCode = 'pt_BR';

    const { user } = await firebase.auth().signInWithPopup(provider)
    const dbUser = await db.getUser(user.email)

    if (!dbUser) {
      const newDbUser = await db.addUser(user.email, user.displayName, user.photoURL)
      return buildUser(user, newDbUser)
    }

    return buildUser(user, dbUser)
  } catch (error) {
    console.log(error)
  }
}
