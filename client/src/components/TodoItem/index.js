import React from 'react';
import styles from './ToDoItem.module.css';

const ToDoItem = (props) => {
    const {item: {_id, body, deadline, status}} = props;
    return (
        <li>
           <span>{body}</span>,
           <span>{new Date(deadline).toISOString()}</span>
           <span>{status}</span>
           <button onClick={() => props.delete(_id)}>X</button>
        </li>
    );
}

export default ToDoItem;
