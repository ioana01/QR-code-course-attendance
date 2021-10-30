import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyB5A3ETp5RD9DHTWw6JQeQbuRvNBbf5AlM",
    authDomain: "qresent-c8ad8.firebaseapp.com",
    projectId: "qresent-c8ad8",
    storageBucket: "qresent-c8ad8.appspot.com",
    messagingSenderId: "861563415852",
    appId: "1:861563415852:web:56601e9d168e0b85909089"
})

export const auth = app.auth()
export default app