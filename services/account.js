import firebase from 'firebase'

export default (onConnect) => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().languageCode = 'pt_BR';

    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;

            onConnect(token, user)
        })
        .catch(function (error) {
            console.log(error)
        });
}