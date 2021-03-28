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

class Firebase {
    constructor(){
        this.fire = firebase;
        this.database = this.fire.database();
    }

    getPokemonSoket = (cb) => {
        this.database.ref('pokemons').on('value', (snapshot) => {
            cb(snapshot.val());
        })
    }
    
    offPokemonSoket = () => {
        this.database.ref('pokemons').off();
    }

    getPokemonsOnce = async () => {
        return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
    }

    postPokemon = (key, pokemon, cb) => {
        this.database.ref(`pokemons/${key}`).set(pokemon).then(() => cb());
    }

    addPokemon = (data , cb) => {
        const newKey = this.database.ref().child('pokemons').push().key;
        this.database.ref('pokemons/' + newKey).set(data).then(() => cb(newKey));
    }
}

const FirebaseClass = new Firebase();

export default FirebaseClass;