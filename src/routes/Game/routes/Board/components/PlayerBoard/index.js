import PokemonCard from '../../../../../../components/PokemonCard';

import cn from 'classnames';
import s from './style.module.css';
import {useState} from 'react';

const PlayerBoard = ({ player, cards, order, onClickCard }) => {
    const [isSelected, setSelected] = useState(null);
    return (
        <div>
            {
                cards.map((item) => (
                    <div 
                        className={cn(s.cardBoard, {
                            [s.selected] : isSelected === item.id
                        })}
                        onClick={() => {
                            if(order === player){
                                setSelected(item.id);
                                onClickCard && onClickCard({
                                    ...item,
                                    player
                                });
                            }
                        }}
                    >
                        <PokemonCard 
                            key={item.id} 
                            keyId={item.key} 
                            name={item.name} 
                            img={item.img} 
                            id={item.id} 
                            type={item.type} 
                            values={item.values} 
                            isActive
                            minimize
                        />
                    </div>
                ))
            }
        </div>
    );
};

export default PlayerBoard;