import React, {useState} from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Home = () => {
    const [state, setState] = useState(true);
    
    const buttonHandler = () => {
        setState(state => !state);
    } 

    const textButton = state ? "SignUp" : "SignIn";

    return (
        <>
            <header> <button onClick={buttonHandler}>{textButton}</button> </header>
            <main> {state ? <SignIn /> : <SignUp />} </main>
        </>
    );
}

export default Home;
