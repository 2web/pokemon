import { useContext, useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import cn from 'classnames';

import PokemonCard from '../../../../components/PokemonCard';
import {PokemonContext} from '../../../../context/pokemonContext';
import {FinishContext} from '../../../../context/finishContext';

import s from './style.module.css';
import PlayerBoard from './components/PlayerBoard';
import Result from './components/Result';

function getSafe(fn, defaultVal="") {
    try {
      return fn();
    } catch (e) {
      return defaultVal;
    }
}

const counterWin = (board, player1, player2) => {
    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(item => {
        if(getSafe(() => item.card.possession) === 'red'){
            player2Count++;
        }
        

        if(getSafe(() => item.card.possession) === 'blue'){
            player1Count++;
        }
    });

    return [player1Count, player2Count];
}

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const BoardPage = () => {
    const { pokemons } = useContext(PokemonContext);//покемоны игрока

    const { finish } = useContext(FinishContext);//признак финала
    const { onFin,onPP1,onPP2 } = useContext(FinishContext);//установка признака финала и карты в финал

    const [board, setBoard] = useState([]);//доска
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemons).map(item => ({
            ...item,
            possession: 'blue'
        }))
    });
    const [player2, setPlayer2] = useState([]);
    const [choiceCard, setChoiceCard] = useState(null);//текущая выбранная карта
    const [steps, setSteps] = useState(0);//количество шагов
    const [order, setOrder] = useState(null);//кто ходит player1 или player2

    const history = useHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async () => {
        const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
        const boardRequest = await boardResponse.json();

        setBoard(boardRequest.data);

        const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
        const player2Request = await player2Response.json();

        setPlayer2(() => {
            return player2Request.data.map(item => ({
                ...item,
                possession: 'red'
            }))
        });
        onPP1(prevState => {
            return {...player1};
        });

        setOrder(random(1,2));
    }, []);

    if (Object.keys(pokemons).length === 0){
        history.replace('/game');
    }

    const handleClickBoardPlate = async (position) => {
        // console.log('position: #####',position);
        // console.log('choiceCard: #####',choiceCard);
        if(choiceCard){
            const params = {
                position,
                card: choiceCard,
                board,
            };

            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();

            // console.log('request: #####',request);
            

            if(choiceCard.player === 1){
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id));
            }
            
            if(choiceCard.player === 2){
                if(player2.length === 5){
                    onPP2(prevState => {
                        return {...player2};
                    });
                }
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id));
            }

            setBoard(request.data);

            setSteps(prevState => {
                const count = prevState + 1;
                return count;
            })

            setOrder(prevState => {
                if(order === 1)
                    return 2;
                else
                    return 1;
            });

            setChoiceCard(null);
        }
    }

    useEffect(() => {
        if(steps === 9){
            const [count1, count2] = counterWin(board, player1, player2);
            
            if(count1 > count2){
                onFin("win");
            } else if(count1 < count2){
                onFin("lose");
            } else{
                onFin("draw");
            }
        }
    }, [steps]);

    const handleFinishClick = () => {
        // console.log('finish!!!');
        history.push('/game/finish');
    }

    return (
        <PokemonContext.Provider value={null}>
            <div className={s.root}>
                <div className={cn(s.playerOne,order===1 && s.active)}>
                    <PlayerBoard 
                        key={1}
                        player={1}
                        cards={player1}
                        order={order}
                        onClickCard={(card) => setChoiceCard(card)} 
                    />
                </div>
                <div className={s.board}>
                    {
                        board.map(item => (
                            <div 
                                key={item.position}
                                className={s.boardPlate}
                                onClick={() => !item.card && handleClickBoardPlate(item.position)}
                            >
                                {
                                    item.card && <PokemonCard {...item.card} isActive minimize />
                                }
                            </div>
                        ))
                    }
                </div>
                {
                    (finish !== null) && <Result type={finish} onSelfClick={() => handleFinishClick()} />
                }
                <div className={cn(s.playerTwo,order===2 && s.active)}>
                    <PlayerBoard 
                        key={2}
                        player={2}
                        cards={player2}
                        order={order}
                        onClickCard={(card) => setChoiceCard(card)}
                    />
                </div>
            </div>
        </PokemonContext.Provider>
    );
};

export default BoardPage;