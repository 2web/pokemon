import { useState } from 'react';
import Menu from '../Menu';
import NavBar from '../NavBar';

const MenuHeader = () => {
  const [menuActive, setMenuActive] = useState(false);
  const handleChangeActive = () => {
    setMenuActive(!menuActive);
  }
  return (
    <>
        <Menu isActive={menuActive} onChangeMenuActive={handleChangeActive}/>
        <NavBar isActive={menuActive} onChangeMenuActive={handleChangeActive}/>
    </>
  );
}

export default MenuHeader;