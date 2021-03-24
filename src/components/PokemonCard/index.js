import cn from 'classnames';
import s from './style.module.css';

const PokemonCard = ({keyId, name, img, id, type, values, isActive, isSelected, onClickCard, minimize, className}) => {
    const handleClickCard = () =>{
        onClickCard && onClickCard(keyId);
    };
  return (
    <div 
        className={cn(className, s.pokemonCard, {
            [s.active]: isActive,
            [s.selected]: isSelected,
        })} onClick={handleClickCard}>
        <div className={s.cardFront}>
            <div className={cn(s.wrap, s.front)}>
                <div className={cn(s.pokemon, s[type])}>
                    <div className={s.values}>
                        <div className={cn(s.count, s.top)}>{values.top}</div>
                        <div className={cn(s.count, s.right)}>{values.right}</div>
                        <div className={cn(s.count, s.bottom)}>{values.bottom}</div>
                        <div className={cn(s.count, s.left)}>{values.left}</div>
                    </div>
                    <div className={s.imgContainer}>
                        <img src={img} alt={name} />
                    </div>
                    { !minimize && (<div className={s.info}>
                        <span className={s.number}>#{id}</span>
                        <h3 className={s.name}>
                            {name}
                        </h3>
                        <small className={s.type}>
                            Type: <span>{type}</span>
                        </small>
                    </div>) }
                </div>
            </div>
        </div>

        <div className={s.cardBack}>
            <div className={cn(s.wrap, s.back)} />
        </div>

    </div>
  );
}

export default PokemonCard;