import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBReLGlZGxK_Jv0ePxwNjB-kZqKi11SNY8",
  authDomain: "editor-markdown-643eb.firebaseapp.com",
  projectId: "editor-markdown-643eb",
  storageBucket: "editor-markdown-643eb.appspot.com",
  messagingSenderId: "794567571413",
  appId: "1:794567571413:web:0a5f2506162c48bb236f5c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)
const provider  = new GoogleAuthProvider()

export {
    auth,
    provider,
    signInWithPopup,
    signOut,

    db
}