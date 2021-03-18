import { useHistory } from 'react-router-dom';

const ContactPage = ({ onChangePage }) =>{
    const history = useHistory();

    const handleClick = () =>{
        history.push('/home');
    };
    return (
        <>
            <p>This is about page!!!</p>
            <button onClick={handleClick}>
                Go to home!
            </button>
        </>
    );
};

export default ContactPage;