import { useState } from 'react';
import Menu from '../Menu';
import NavBar from '../NavBar';

const MenuHeader = ({bgActive}) => {
  const [isOpen, setOpen] = useState(null);
  const handleClickHamburg = () => {
    setOpen(prevState => !prevState);
  }
  return (
    <>
        <Menu isOpen={isOpen} onClickHamburg={handleClickHamburg} />
        <NavBar isOpen={isOpen} bgActive={bgActive} onClickHamburg={handleClickHamburg}/>
    </>
  );
}

export default MenuHeader;