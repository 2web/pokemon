import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './counter';
import pokemonsReducer from './pokemon';

export default configureStore({
    reducer: {
        counter: counterReducer,
        pokemons: pokemonsReducer
    }
});
