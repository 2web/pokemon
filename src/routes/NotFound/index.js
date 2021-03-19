import s from './style.module.css';
import { useHistory } from 'react-router-dom';

const ContactPage = () =>{
    const history = useHistory();
    const handleClick = () => {
        history.push('/home');
    }
    return (
        <div className={s.root}>
            <header>404 Not Found!</header>
            <p>
                <button onClick={handleClick}>
                    Go home!
                </button>
            </p>
        </div>
    );
};

export default ContactPage;