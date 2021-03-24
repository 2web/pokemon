import {PokemonContext} from '../../../../context/pokemonContext';

import s from './style.module.css';

const BoardPage = () => {
    return (
        <PokemonContext.Provider>
            <div className={s.root}>
                            <div className={s.playerOne}>

                            </div>
                <div className={s.board}>
                    <div className={s.boardPlate}>1</div>
                    <div className={s.boardPlate}>2</div>
                    <div className={s.boardPlate}>3</div>
                    <div className={s.boardPlate}>4</div>
                    <div className={s.boardPlate}>5</div>
                    <div className={s.boardPlate}>6</div>
                    <div className={s.boardPlate}>7</div>
                    <div className={s.boardPlate}>8</div>
                    <div className={s.boardPlate}>9</div>
                </div>
            </div>
        </PokemonContext.Provider>
    );
};

export default BoardPage;