import cn from 'classnames';
import s from './style.module.css';

import {ReactComponent as LoginSVG} from '../../assets/login.svg';

const NavBar = ({isOpen, bgActive = false, onClickHamburg, onClickLogin}) => {
  return (
    <nav id={s.navbar} className={cn({
        [s.bgActive]: bgActive
    })}>
        <div className={s.navWrapper}>
            <div className={s.brand}>
                LOGO
            </div>
            <div className={s.loginAndMenu}>
                <div className={s.loginWrap}
                    onClick={onClickLogin}>
                    <LoginSVG />
                </div>
                <div className={cn(s.menuButton, {
                    [s.active]: isOpen === true
                })} onClick={onClickHamburg} >
                    <span />
                </div>
            </div>
        </div>
    </nav>
  );
}

export default NavBar;