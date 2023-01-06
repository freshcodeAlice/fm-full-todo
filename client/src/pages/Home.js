import React, {useState, useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import {registerUser} from '../api/index';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Home = (props) => {
    const [state, setState] = useState(true);
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(data) {
            registerUser(data)
            .then(result => {
                props.sendUser(result);
                navigate('/tasks');
            })
            .catch(err => {
               setError(err);
            })
        }
    }, [data]);
    
    const buttonHandler = () => {
        setState(state => !state);
    } 

    const getData = (userData) => {
        setData(userData);
    }

    const textButton = state ? "SignUp" : "SignIn";

    return (
        <>
            <header> <button onClick={buttonHandler}>{textButton}</button> </header>
            <main> {state ? <SignIn sendData={getData}/> : <SignUp sendData={getData}/>} </main>
            {error && <div>{error}</div>}
        </>
    );
}

export default Home;
