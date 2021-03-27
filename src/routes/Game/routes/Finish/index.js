import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
import { FinishContext } from '../../../../context/finishContext';
import { FireBaseContext } from '../../../../context/firebaseContext';
import { useState } from 'react';

import s from './style.module.css';

const FinishPage = () => {
    const history = useHistory();
    const firebase = useContext(FireBaseContext);
    const pokemonsContext = useContext(PokemonContext);
    const finishContext = useContext(FinishContext);
    const { finish, pP1, pP2 } = useContext(FinishContext);

    const [pokemonreward, setPokemonReward] = useState(null);

    // const Fin = () => {
    //     console.log("tfinish ",finish);
    //     if(finish === "win"){
    //         return <h1>Win</h1>;
    //     }else if(finish === "lose"){
    //         return <h1>Lose</h1>;
    //     }else{
    //        return <h1>Draw</h1>;
    //     }
    // }

    if(finish === null){
        history.replace('/home');
    }

    const handleClickCard = (key) => {
        if(pokemonreward !== null && pokemonreward === key){
            finishContext.onPP2(prevState => {
                const result = { ...prevState, 
                [key]: {
                    ...prevState[key],
                    selected: false,
                } };
                return result;
            });
            setPokemonReward(null);
        }
        else if (pokemonreward === null){
            finishContext.onPP2(prevState => {
                const result = { ...prevState, 
                [key]: {
                    ...prevState[key],
                    selected: true,
                } };
                return result;
            });
            setPokemonReward(key);
        }
    }

    const handleEndGame = () => {
        if(pokemonreward !== null){
            var obj = pP2;
            const newPoke = obj[pokemonreward];
            delete newPoke.selected;
            delete newPoke.possession;
            const newkkey = (key) => {
                return key;
            };
            firebase.addPokemon(newPoke,newkkey);
        }

        pokemonsContext.onResetPokemons();
        finishContext.onPP1({});
        finishContext.onPP2({});
        finishContext.onFin(null);
        history.push('/home');
    }
    return (
        <div className={s.root}>
            <div className={s.board}>
                <div className={s.flexinline}>
                    {
                        Object.entries(pP1).map(([key, {keyId, name, img, id, type, values, selected}]) => 
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
                            minimize={false}
                            className={s.card}
                        />)
                    }
                </div>
                <div style={{ textAlign: "center", margin: "30px 0 30px 0"}}>
                    <button 
                        onClick={handleEndGame}
                        disabled={pokemonreward === null && finish === "win" ? 'disabled' : ''}>
                        END GAME
                    </button>
                </div>
                <div className={s.flexinline}>
                    {
                        Object.entries(pP2).map(([key, {keyId, name, img, id, type, values, selected}]) => 
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
                                if(finish === "win")
                                    handleClickCard(key);
                            }} 
                            minimize={false}
                            className={s.card}
                        />)
                    }
                </div>
            </div>
        </div>
    );
};

export default FinishPage;