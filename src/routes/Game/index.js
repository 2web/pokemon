import { useRouteMatch, Route, Switch } from 'react-router-dom'

import StartPage from './routes/Start';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';
import {PokemonContext} from '../../context/pokemonContext';
import {FinishContext} from '../../context/finishContext';
import { useState } from 'react';

const GamePage = () => {
  const [selectedPokemons, setSelectedPokemons] = useState({});
  const [pokemonsPlayer1, setPokemonsPlayer1] = useState({});
  const [pokemonsPlayer2, setPokemonsPlayer2] = useState({});
  const [iFinish, setFinish] = useState(null);
  const match = useRouteMatch();

  const handleSelectedPokemons = ( key, pokemon) => {
    setSelectedPokemons( prevState => {
      if( prevState[key] ) {
        const copyState = {...prevState};
        delete copyState[key];

        return copyState;
      }
      return {
        ...prevState,
        [key]: pokemon,
      }
        
    })
  }
  
  const handleResetPokemons = ( key, pokemon) => {
    setSelectedPokemons( prevState => {
      return {}
    })
  }

  return (
      <PokemonContext.Provider value={{
        pokemons: selectedPokemons,
        onSelectedPokemons: handleSelectedPokemons,
        onResetPokemons: handleResetPokemons,
      }}>
        <FinishContext.Provider value={{
          finish: iFinish,
          onFin: setFinish,
          pP1: pokemonsPlayer1,
          pP2: pokemonsPlayer2,
          onPP1: setPokemonsPlayer1,
          onPP2: setPokemonsPlayer2
        }}>
          <Switch>
              <Route path={`${match.path}/`} exact component={StartPage} />
              <Route path={`${match.path}/board`} component={BoardPage} />
              <Route path={`${match.path}/finish`} component={FinishPage} />
          </Switch>
        </FinishContext.Provider>
      </PokemonContext.Provider>
  );
};

export default GamePage;