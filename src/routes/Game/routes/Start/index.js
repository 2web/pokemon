import {useState, useEffect, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
import { getPokemonsAsync, selectPokemonsData } from '../../../../store/pokemon';

import s from './style.module.css';

const StartPage = () =>{
  const pokemonsContext = useContext(PokemonContext);
  const pokemonsRedux = useSelector(selectPokemonsData);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("pokemonsRedux",pokemonsRedux);
  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    dispatch(getPokemonsAsync());
  }, []);

  useEffect(() => {
    setPokemons(pokemonsRedux);  
  },[pokemonsRedux]);

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