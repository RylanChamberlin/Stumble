
import * as firebase from "firebase";
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEjcZKWdGQlDnw5Pp5eNKnY5jN6RO0h5A",
    authDomain: "barapp-347820.firebaseapp.com",
    projectId: "barapp-347820",
    storageBucket: "barapp-347820.appspot.com",
    messagingSenderId: "1025146739011",
    appId: "1:1025146739011:web:77072f50e2709547a3f7f6",
    measurementId: "G-28XN5MN4S1"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth();
const db = firebase.firestore();
const database = firebase.database()
const storage = firebase.storage()
const storageRef = firebase.storage().ref();
const FieldValue = firebase.firestore.FieldValue;
const GeoPoint = firebase.firestore.GeoPoint;
const dbTime = firebase.firestore.FieldValue.serverTimestamp()

const provider = new firebase.auth.GoogleAuthProvider();
const appleProvider = new firebase.auth.OAuthProvider('apple.com')
const signInWithCredential = firebase.auth.signInWithCredential;


export { auth, db, database, FieldValue, dbTime, GeoPoint, storage, storageRef, provider, signInWithCredential, appleProvider};
export {  }