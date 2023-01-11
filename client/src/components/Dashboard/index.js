import React, {useState, useEffect} from 'react';
import TodoPage from '../../pages/TodoPage';
import {authUser} from '../../api/userApi';
import { useNavigate } from 'react-router-dom';

const Dashboard = (props) => {
    const [todo, setTodo] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
        if(!props.user) {
            const token = localStorage.getItem('token');
            if (token) {
                //// робимо запит на отримання юзера
                authUser(token)
                .then(userData => {
                  props.sendUser(userData.data);
                }).catch(error => {
                    // якщо токен невалідний - перенаправляємо на авторизацію
                    console.log('INVALID');
                    navigate('/');
                })
            } else {
                //перенаправляємо на авторизацію
                navigate('/');
            }
        } else {
            setTodo(true);
        }
       
    }, [props.user]);


    return (
        <>
       {todo ? <TodoPage /> : null}
       </>
    );
}

export default Dashboard;
