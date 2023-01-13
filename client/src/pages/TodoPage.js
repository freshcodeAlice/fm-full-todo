import React, {useState, useEffect} from 'react';
import TodoList from '../components/TodoList';
import {getTasks, createTask, deleteTask} from '../api/taskApi';
import {authUser} from '../api/userApi';
import ToDoForm from '../components/ToDoForm';
// import history from '../BrowserHistory';

const TodoPage = (props) => {
    const [todos, setTodos] = useState([]);

    useEffect(()=>{
        getTasks()
        .then(result => {
         setTodos(result.data);
        })
        .catch(error => {
         console.error(error);
        })
    }, []);

    const getNewTd = (data) => {
        createTask({
            status: 'new',
            ...data 
        }).then(({data: createdTask })=> {
            const newTodo = [...todos, createdTask];
            setTodos(newTodo);
        }).catch(error => {
            console.error(error);
        })
    }


    const delTask = (id) => {
        deleteTask(id)
        .then(({data: deletedTask}) => {
            console.log(deletedTask);
            const updatedTask = todos.filter(td => td._id !== deletedTask._id);
            console.log(updatedTask);
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
