import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBzNXWCp41rCQjR4THiuXoYWb4TAbI4uFs",
    authDomain: "todos-e3bb4.firebaseapp.com",
    databaseURL: "https://todos-e3bb4.firebaseio.com",
    projectId: "todos-e3bb4",
    storageBucket: "todos-e3bb4.appspot.com",
    messagingSenderId: "807011580628",
    appId: "1:807011580628:web:ec382c371c136131b19941"
});

const db = firebase.firestore()
const auth = firebase.auth()

export default db