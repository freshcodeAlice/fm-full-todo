import React, {useState, useEffect} from 'react';
import TodoList from '../components/TodoList';
import {getTasks, createTask} from '../api/taskApi';
import { useNavigate} from "react-router-dom";
import ToDoForm from '../components/ToDoForm';

const TodoPage = (props) => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(!props.user) {
           return navigate('/');
        }
       getTasks(props.user._id)
       .then(result => {
        setTodos(result.data);
       })
       .catch(error => {
        console.error(error);
       })
    }, []);

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
