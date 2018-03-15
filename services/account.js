import firebase from 'firebase'

const connectWithUser = (user, dbUser, onConnect) => {
    const result = Object.assign({}, 
        dbUser, 
        { displayName: user.displayName, photoURL: user.photoURL })

    result.canEdit = () => {
        return dbUser && (dbUser.admin || dbUser.author)
    }
    
    result.canRead = () => {
        return dbUser //&& (dbUser.admin || dbUser.author || dbUser.reader)
    }

    result.canVote = () => {
        return dbUser && (dbUser.admin || dbUser.author || dbUser.reader)
    }

    onConnect(result)
}

export default (db, onConnect) => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().languageCode = 'pt_BR';

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const token = result.credential.accessToken;
            const user = result.user;

            db.getUser(user.email).then(dbUser => {
                if (!dbUser)
                    db.addUser(user.email, user.displayName, user.photoURL).then(newDbUser => connectWithUser(user, newDbUser, onConnect))
                else
                    connectWithUser(user, dbUser, onConnect)
            })
        })
        .catch(function (error) {
            console.log(error)
        });
}