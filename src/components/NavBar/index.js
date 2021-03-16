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
                <a className={cn(s.menuButton, {[s.active]: isActive}, {[s.deactive]: !isActive})} onClick={handleClickButton} href="/#">
                    <span />
                </a>
            </div>
        </nav>
    </>
  );
}

export default NavBar;