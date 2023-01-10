import React, {useState, useEffect} from 'react';
import TodoList from '../components/TodoList';
import {getTasks, createTask} from '../api/taskApi';
import {authUser} from '../api/userApi';
import { useNavigate} from "react-router-dom";
import ToDoForm from '../components/ToDoForm';

const TodoPage = (props) => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(!props.user) {
        //    return navigate('/');
            const token = localStorage.getItem('token');
            if (token) {
                //// робимо запит на отримання юзера
                authUser(token)
                .then(userData => {
                    props.sendUser(userData.data);
                }).catch(error => {
                    // якщо токен невалідний - перенаправляємо на авторизацію
                    return navigate('/');
                })
            } else {
                //перенаправляємо на авторизацію
                return navigate('/');
            }
        } else {
            getTasks(props.user._id)
            .then(result => {
             setTodos(result.data);
            })
            .catch(error => {
             console.error(error);
            })
        }
        /*
        1. Заходимо і перевіряємо, чи є у нас об'єкт юзера.
        2. Якщо є - все ок, працюємо.
        3. Якщо немає - дивимось, чи є у нас токен.
        4. Якщо токен є - беремо його і йдемо на сервер, перевіряємось, якщо токен валідний - відправляємо об'єкт юзера у відповідь
        5. Якщо токен невалідний - видаємо помилку з сервера, на фронті - ловимо цю помилку і у відповідь на неї перенаправляємось на сторінку авторизації і змушуємо користувача вводити логін/пароль знову
        6. Якщо токена немає - перенаправляємось на сторінку авторизації і змушуємо користувача вводити логін/пароль знову.
        */
       
    }, [props.user]);

    const getNewTd = (data) => {
        createTask({
            authorId: props.user._id,
            status: 'new',
            ...data 
        }).then(({data: createdTask })=> {
            const newTodo = [...todos, createdTask];
            setTodos(newTodo);
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div>
            <h1>ToDo List</h1>
            <ToDoForm sendData={getNewTd}/>
            <TodoList todos={todos}/>
        </div>
    );
}

export default TodoPage;
