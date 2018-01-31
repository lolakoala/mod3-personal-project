import firebase from 'firebase';
import fbKey from './app/firebaseKey.js';

const config = {
  apiKey: fbKey,
  authDomain: "tribe-a7f92.firebaseapp.com",
  databaseURL: "https://tribe-a7f92.firebaseio.com",
  projectId: "tribe-a7f92",
  storageBucket: "",
  messagingSenderId: "483825880412"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
