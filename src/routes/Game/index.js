import {useState} from 'react';

import PokemonCard from '../../components/PokemonCard';

import s from './style.module.css';

const POKEMONS = [
    {
      "abilities": [
        "keen-eye",
        "tangled-feet",
        "big-pecks"
      ],
      "stats": {
        "hp": 63,
        "attack": 60,
        "defense": 55,
        "special-attack": 50,
        "special-defense": 50,
        "speed": 71
      },
      "type": "flying",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
      "name": "pidgeotto",
      "base_experience": 122,
      "height": 11,
      "id": 17,
      "values": {
        "top": "A",
        "right": 2,
        "bottom": 7,
        "left": 5
      }
    },
    {
      "abilities": [
        "intimidate",
        "shed-skin",
        "unnerve"
      ],
      "stats": {
        "hp": 60,
        "attack": 95,
        "defense": 69,
        "special-attack": 65,
        "special-defense": 79,
        "speed": 80
      },
      "type": "poison",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png",
      "name": "arbok",
      "base_experience": 157,
      "height": 35,
      "id": 24,
      "values": {
        "top": 5,
        "right": 9,
        "bottom": "A",
        "left": "A"
      }
    },
    {
      "abilities": [
        "static",
        "lightning-rod"
      ],
      "stats": {
        "hp": 35,
        "attack": 55,
        "defense": 40,
        "special-attack": 50,
        "special-defense": 50,
        "speed": 90
      },
      "type": "electric",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      "name": "pikachu",
      "base_experience": 112,
      "height": 4,
      "id": 25,
      "values": {
        "top": 8,
        "right": "A",
        "bottom": 9,
        "left": 6
      }
    },
    {
      "abilities": [
        "overgrow",
        "chlorophyll"
      ],
      "stats": {
        "hp": 45,
        "attack": 49,
        "defense": 49,
        "special-attack": 65,
        "special-defense": 65,
        "speed": 45
      },
      "type": "grass",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      "name": "bulbasaur",
      "base_experience": 64,
      "height": 7,
      "id": 1,
      "values": {
        "top": 8,
        "right": 4,
        "bottom": 2,
        "left": 7
      }
    },
    {
      "abilities": [
        "blaze",
        "solar-power"
      ],
      "stats": {
        "hp": 39,
        "attack": 52,
        "defense": 43,
        "special-attack": 60,
        "special-defense": 50,
        "speed": 65
      },
      "type": "fire",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      "name": "charmander",
      "base_experience": 62,
      "height": 6,
      "id": 4,
      "values": {
        "top": 7,
        "right": 6,
        "bottom": 1,
        "left": 4
      }
    }
  ];

const GamePage = () =>{
  const [pokemons, setPokemons] = useState(POKEMONS);

  const handleClickPokemon = (id) => {
    setPokemons(pokemons.map(item =>
        item.id === id
        ? {...item, active : true}
        : item
    ));
  }

  return (
      <div className={s.root}>
          <div className="flex">
              {
                pokemons.map((item) => <PokemonCard key={item.id} name={item.name} img={item.img} id={item.id} type={item.type} values={item.values} isActive={item.active} handleClickPokemon={handleClickPokemon} />)
              }
          </div>
      </div>
  );
};

export default GamePage;