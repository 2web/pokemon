import s from './style.module.css';
import { useHistory } from 'react-router-dom';

const AboutPage = () =>{
    const history = useHistory();

    const handleClick = () =>{
        history.push('/home');
    };
    return (
        <div className={s.root}>
            <header>This is about page!!!</header>
            <p>
                <button onClick={handleClick}>
                    Go home!
                </button>
            </p>
        </div>
    );
};

export default AboutPage;