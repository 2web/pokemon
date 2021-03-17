import cn from 'classnames';
import s from './style.module.css';

const Menu = ({isActive, onChangeMenuActive}) => {
    const menuList = ['welcome', 'game', 'about', 'contact'];
    const menuItems = menuList.map((name) => {
        return (
            <li>
                <a href={"#"+name}>
                    {name.toUpperCase()}
                </a>
            </li>
        )
        }
    );
    return (
        <>
            <div className={cn(s.menuContainer, {[s.active]: isActive, [s.deactive]: !isActive})}>
                <div className={s.overlay} />
                    <div className={s.menuItems}>
                        <ul>
                            {menuItems}
                        </ul>
                    </div>
            </div>
        </>
    );
}

export default Menu;