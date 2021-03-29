import {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard';
import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';

import s from './style.module.css';

const StartPage = () =>{
  const history = useHistory();
  const firebase = useContext(FireBaseContext);
  const pokemonsContext = useContext(PokemonContext);
  const [pokemons, setPokemons] = useState({});
  
  useEffect(() => {
    firebase.getPokemonSoket((pokemons) => {
      setPokemons(pokemons);
    })

    return () => firebase.offPokemonSoket();
  }, [firebase]);

  const handleStartGame = () => {
    history.push('/game/board');
  }

  const handleClickCard = (key) => {
    const pokemon = {...pokemons[key]};
    pokemonsContext.onSelectedPokemons(key, pokemon);
    
    setPokemons(prevState => {
        const result = { ...prevState, 
        [key]: {
            ...prevState[key],
            selected: !prevState[key].selected,
        } };
        return result;
    });
  }

  return (
      <div className={s.root}>
          <div style={{ textAlign: "center", margin: "0 0 30px 0"}}>
            <button 
                onClick={handleStartGame}
                disabled={Object.keys(pokemonsContext.pokemons).length < 5 ? 'disabled' : ''}>
              Start game
            </button>
          </div>
          <div className={s.flex}>
              {
                Object.entries(pokemons).map(([key, {keyId, name, img, id, type, values, selected}]) => 
                  <PokemonCard 
                    key={key} 
                    keyId={key} 
                    name={name} 
                    img={img} 
                    id={id} 
                    type={type} 
                    values={values} 
                    isActive
                    isSelected={selected}
                    onClickCard={() => {
                        if(Object.keys(pokemonsContext.pokemons).length < 5 || selected)
                            handleClickCard(key);
                        }} 
                    minimize={false}
                    className={s.card}
                  />)
              }
          </div>
      </div>
  );
};

export default StartPage;