// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";

export const loginTwitter = () => {
  var provider = new firebase.auth.TwitterAuthProvider();
  firebase
    .auth()
    .signInWithRedirect(provider)
    .then((result) => {
      // // /** @type {firebase.auth.OAuthCredential} */
      // var credential = result.credential;

      // // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // // You can use these server side with your app's credentials to access the Twitter API.
      // var token = credential.accessToken;
      // var secret = credential.secret;

      // // The signed-in user info.
      // var user = result.user;
      console.log("ログイン成功！")
      return result;
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      console.log("ログイン失敗...")
      console.log(errorMessage);
      return null;
    });
};

export const logoutTwitter = () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("ログアウトしたよ");
  }).catch((error) => {
    // An error happened.
  });
};
