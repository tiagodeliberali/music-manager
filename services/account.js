import firebase from 'firebase'

export default (db, onConnect) => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().languageCode = 'pt_BR';

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const token = result.credential.accessToken;
            const user = result.user;

            db.getUser(user.email).then(dbUser => {
                const result = Object.assign({}, 
                    dbUser, 
                    { displayName: user.displayName, photoURL: user.photoURL })

                result.canEdit = () => {
                    return dbUser && (dbUser.admin || dbUser.author)
                }
                
                result.canRead = () => {
                    return dbUser //&& (dbUser.admin || dbUser.author  || dbUser.reader)
                }

                onConnect(result)
            })
        })
        .catch(function (error) {
            console.log(error)
        });
}