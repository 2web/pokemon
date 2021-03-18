import cn from 'classnames';
import s from './style.module.css';

const NavBar = ({isOpen, bgActive = false, onClickHamburg}) => {
  return (
    <nav id={s.navbar} className={cn({
        [s.bgActive]: bgActive
    })}>
        <div className={s.navWrapper}>
            <p className={s.brand}>
                LOGO
            </p>
            <div className={cn(s.menuButton, {
                [s.active]: isOpen === true
            })} onClick={onClickHamburg} >
                <span />
            </div>
        </div>
    </nav>
  );
}

export default NavBar;