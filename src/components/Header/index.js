import s from './style.module.css';

const Header = (props) => {
  return (
    <>
        <header className={s.root}>
            <div className={s.forest}></div>
            <div className={s.container}>
                <h1>{props.title}</h1>
                <p>{props.descr}</p>
            </div>
        </header>
    </>
  );
}

export default Header;