import React from 'react';
import ToDoItem from '../TodoItem';

const TodoList = (props) => {
    
    return (
        <>

        <ul>
            {props.todos.map(td => <ToDoItem item={td} key={td._id}/>)}
        </ul>
        </>
    );
}

export default TodoList;
