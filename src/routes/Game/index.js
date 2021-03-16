const GamePage = ({ onChangePage }) =>{
    const handleClickButton = () => {
        console.log('####: <HomePage />');
        onChangePage && onChangePage('app');
    };
    return (
        <>
            <p>This is game page!!!</p>
            <button onClick={handleClickButton}>
                Go to home!
            </button>
        </>
    );
};

export default GamePage;