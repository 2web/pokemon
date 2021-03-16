import cn from 'classnames';
import s from './style.module.css';

const NavBar = ({isActive, onChangeMenuActive}) => {
  const handleClickButton = () => {
        onChangeMenuActive && onChangeMenuActive(isActive);
  };
  return (
    <>
        <nav className={s.root}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                    LOGO
                </p>
                <a className={cn(s.menuButton, {[s.active]: isActive})} onClick={handleClickButton} >
                    <span />
                </a>
            </div>
        </nav>
    </>
  );
}

export default NavBar;