import firebase from 'firebase'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const buildUser = (user, dbUser) => {
  const result = Object.assign(
    {},
    dbUser,
    { displayName: user.displayName, photoURL: user.photoURL }
  )

  result.isAdmin = () => dbUser && dbUser.admin
  result.canEdit = () => dbUser && (dbUser.admin || dbUser.author)
  result.canRead = () => dbUser && (dbUser.admin || dbUser.author || dbUser.reader)
  result.canVote = () => dbUser && (dbUser.admin || dbUser.author || dbUser.reader)

  return result
}

const getFacebookUser = async () => {
  let facebookUser = {}

  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().languageCode = 'pt_BR';

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const result = await firebase.auth().signInWithPopup(provider)
    facebookUser = result.user
  } else {
    const result = await firebase.auth().getRedirectResult()
    if (!result.user)
      firebase.auth().signInWithRedirect(provider)

    facebookUser = result.user
  }

  return facebookUser
}

export default async (db) => {
  try {
    let facebookUser = cookies.get('facebookUser')

    if (!facebookUser || !facebookUser.email) {
      facebookUser = await getFacebookUser()
      cookies.set('facebookUser', facebookUser)
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
