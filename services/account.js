import firebase from 'firebase'

const buildUser = (user, dbUser) => {
  const result = Object.assign(
    {},
    dbUser,
    { displayName: user.displayName, photoURL: user.photoURL }
  )

  result.canEdit = () => dbUser && (dbUser.admin || dbUser.author)
  result.canRead = () => dbUser && (dbUser.admin || dbUser.author || dbUser.reader)
  result.canVote = () => dbUser && (dbUser.admin || dbUser.author || dbUser.reader)

  return result
}

export default async (db) => {
  try {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().languageCode = 'pt_BR';

    let facebookUser = {}

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      const result = await firebase.auth().signInWithPopup(provider)
      facebookUser = result.user
    } else {
      const result = await firebase.auth().getRedirectResult()
      if (!result.user)
        firebase.auth().signInWithRedirect(provider)

      facebookUser = result.user
    }

    const dbUser = await db.getUser(facebookUser.email)

    if (!dbUser) {
      const newDbUser =
        await db.addUser(facebookUser.email, facebookUser.displayName, facebookUser.photoURL)

      return buildUser(facebookUser, newDbUser)
    }

    return buildUser(facebookUser, dbUser)
  } catch (error) {
    console.log(error)
  }
}
