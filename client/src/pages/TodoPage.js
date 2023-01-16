import React, {useState, useEffect} from 'react';
import TodoList from '../components/TodoList';
// import {getTasks, createTask, deleteTask} from '../api/taskApi';
// import {authUser} from '../api/userApi';
import ToDoForm from '../components/ToDoForm';
import {getTask, createTask, deleteTask} from '../api/axiosApi';

const TodoPage = (props) => {
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        getTask()
        .then(({data: {data}}) => {
         setTodos(data);
        })
        .catch(error => {
         console.error(error);
        })
    }, []);

    const getNewTd = (data) => {
        createTask({
            status: 'new',
            ...data 
        }).then(({data: {data: createdTask} })=> {
            const newTodo = [...todos, createdTask];
            setTodos(newTodo);
        }).catch(error => {
            console.error(error);
        })
    }


    const delTask = (id) => {
        deleteTask(id)
        .then(({data: {data: deletedTask}}) => {
            const updatedTask = todos.filter(td => td._id !== deletedTask._id);
            setTodos(updatedTask);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <h1>ToDo List</h1>
            <ToDoForm sendData={getNewTd}/>
            <TodoList todos={todos} delCallback={delTask}/>
        </div>
    );
}

export default TodoPage;
