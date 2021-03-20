import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDNXdwTGfZV6iO1BZyZOiR5qZtfaqjY2z4",
    authDomain: "pokemon-game-b8c6c.firebaseapp.com",
    databaseURL: "https://pokemon-game-b8c6c-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-b8c6c",
    storageBucket: "pokemon-game-b8c6c.appspot.com",
    messagingSenderId: "599814219280",
    appId: "1:599814219280:web:16d64a9033b3b8fa7b4c95"
};
  
firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = fire.database();

export default database;