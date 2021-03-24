import s from './style.module.css';

const FinishPage = () => {
    return (
        <div className={s.root}>
            <div className={s.board}>
                <h1>Win!</h1>
            </div>
        </div>
    );
};

export default FinishPage;