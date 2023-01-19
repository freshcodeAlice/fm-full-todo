import React, {useState, useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import styles from './Home.module.css';
import history from '../../BrowserHistory';


const Home = (props) => {
    const [state, setState] = useState();
    
    const buttonHandler = () => {
        setState(state => !state);
    } 

    const textButton = state ? "SignUp" : "SignIn";

    return (
        <div className={styles.container}>
            <header> <button onClick={buttonHandler}>{textButton}</button> </header>
            <main className={styles['form-wrapper']}> {state ? <SignIn /> : <SignUp />} 
            {/* {error && <div className={styles['error-container']}>{error.message}</div>} */}
            </main>

        </div>
    );
}

export default Home;
