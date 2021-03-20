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

  const handleClickPokemon = (id, keyId) => {
    setPokemons(prevState => {
      return Object.entries(prevState).reduce((acc, item) => {
          const pokemon = {...item[1]};
          if (item[0] === keyId) {
              pokemon.active = true;
              database.ref('pokemons/' + keyId).update({
                active: pokemon.active,
              }, (error) => {
                if ( !error ){
                  console.log("update complete!")
                }
                else{
                  console.log("update error!")
                }
              })
          };

          acc[item[0]] = pokemon;
          return acc;
      }, {});
    });
  }

  const handleResetCardsClick = () => {
    let bcheck = null;
    // eslint-disable-next-line array-callback-return
    Object.entries(pokemons).map(([key, {active}]) => {
      if(active === true){
        if(bcheck === null)
          bcheck = false;
        database.ref('pokemons/' + key).update({
          active: false,
        }, (error) => {
          if ( error ){
            bcheck = true;
            console.log("Error save reset data!");
          }
          else{
            console.log("Reseted data saved!");
          }
        })
      }
    }
    )
    if( !bcheck ){
      refreshData();
    }
  }

  const handleAddCardClick = () => {
    var obj = pokemons;
    var keys = Object.keys(pokemons); //получаем ключи объекта в виде массива
    console.log(keys[keys.length - 1]); //последний элемент
    const newKey = database.ref().child('pokemons').push().key;
    database.ref('pokemons/' + newKey).set(obj[keys[keys.length - 1]]);
    refreshData();
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