
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

