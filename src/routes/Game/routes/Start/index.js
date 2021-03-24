import {useState, useEffect, useContext} from 'react';

import PokemonCard from '../../../../components/PokemonCard';
import { FireBaseContext } from '../../../../context/firebaseContext';

import s from './style.module.css';

const StartPage = () =>{
  const firebase = useContext(FireBaseContext)
  const [pokemons, setPokemons] = useState({});
  
  useEffect(() => {
    firebase.getPokemonSoket((pokemons) => {
      setPokemons(pokemons);
    })

    return () => firebase.offPokemonSoket();
  }, [firebase]);

  const handleClickCard = (key) => {
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
          <div style={{ textAlign: "center", margin: "0 0 20px 0"}}>
            <button>
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
                    isActive={true}
                    isSelected={selected}
                    onClickCard={handleClickCard} 
                    minimize={false}
                    className={s.card}
                  />)
              }
          </div>
      </div>
  );
};

export default StartPage;