import React from 'react';

const TodoList = (props) => {
    return (
        <ul>
            {props.todos.map(td => <li>{td}</li>)}
        </ul>
    );
}

export default TodoList;
