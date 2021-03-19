import { useHistory } from 'react-router-dom';

import s from './style.module.css';
import './style.css';

const Header = ({title, descr, onClickButton}) => {
  const history = useHistory();
  
  const handleClick = () =>{
      history.push('/game');
  };

  //estrelas
  var style = ["style1", "style2", "style3", "style4"];
  var tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
  var opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function createMarkup() { return {__html: estrela}; };

  var estrela = "";
  var qtdeEstrelas = 350;
  var widthWindow = window.innerWidth;
  var heightWindow = window.innerHeight;

  for (var i = 0; i < qtdeEstrelas; i++) {
    estrela += "<span class='estrela " + style[getRandomArbitrary(0, 4)] + " " + opacity[getRandomArbitrary(0, 6)] + " "
    + tam[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: "
    + getRandomArbitrary(0, widthWindow) + "px; top: " + getRandomArbitrary(0, heightWindow) + "px;'></span>";
  }

  return (
    <>
        <header className={s.root}>
            <div className="constelacao" dangerouslySetInnerHTML={createMarkup()}></div>
            <div className={s.forest}></div>
            <div className={s.silhouette}></div>
            <div className={s.moon}></div>
            <div className={s.container}>
                <h1>{title}</h1>
                <p>{descr}</p>
                <button onClick={handleClick}>
                    Start Game
                </button>
            </div>
        </header>
    </>
  );
}

export default Header;