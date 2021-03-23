import {useState, useEffect} from 'react';

import PokemonCard from '../../components/PokemonCard';

import database from '../../service/firebase';
import s from './style.module.css';

const GamePage = () =>{
  const [pokemons, setPokemons] = useState({});
  const refreshData = () => {
    database.ref('pokemons').once('value', (snapshot) => {
      setPokemons(snapshot.val());
    });
  }
  useEffect(() => {
    refreshData();
  }, []);

  const handleClickPokemon = (keyId) => {
    Object.entries(pokemons).forEach((item) => {
          const pokemon = {...item[1]};
          if (item[0] === keyId) {    
            pokemon.active = true;
            database.ref('pokemons/'+ keyId).update(pokemon)
            .then(function() {
              setPokemons(prevState => {
                const result = { ...prevState, [keyId]:pokemon };
                return result;
              });
            });
          }
    });
  }

  const handleResetCardsClick = () => {
    Object.entries(pokemons).forEach((item) => {
      const keyId = item[0];
      const pokemon = {...item[1]};
      if(pokemon.active === true){
        pokemon.active = false;
        database.ref('pokemons/' + keyId).update(pokemon)
        .then(function() {
          setPokemons(prevState => {
            const result = { ...prevState, [keyId]:pokemon };
            return result;
          });    
        });
      }
    });
  }

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleAddCardClick = () => {
    var obj = pokemons;
    var keys = Object.keys(pokemons); //получаем ключи объекта в виде массива
    const newKey = database.ref().child('pokemons').push().key;
    const newPoke = obj[keys[random(0,keys.length - 1)]];
    database.ref('pokemons/' + newKey).set(newPoke)
    .then(function() {
      setPokemons(prevState => {
        const result = { ...prevState, [newKey]:newPoke };
        return result;
      });    
    });
  }

  return (
      <div className={s.root}>
          <div style={{ textAlign: "center"}}>
            <button onClick={handleResetCardsClick}>
              Reset Cards
            </button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <button onClick={handleAddCardClick}>
              Add Card
            </button>
          </div>
          <div className="flex">
              {
                Object.entries(pokemons).map(([key, {keyId, name, img, id, type, values, active}]) => 
                  <PokemonCard 
                    key={key} 
                    keyId={key} 
                    name={name} 
                    img={img} 
                    id={id} 
                    type={type} 
                    values={values} 
                    isActive={active} 
                    handleClickPokemon={handleClickPokemon} 
                  />)
              }
          </div>
      </div>
  );
};

export default GamePage;