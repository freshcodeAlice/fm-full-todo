import React from 'react';
import styles from './ToDoItem.module.css';

const ToDoItem = (props) => {
    const {item: {body, deadline, status}} = props;
    return (
        <li>
           <span>{body}</span>,
           <span>{new Date(deadline).toISOString()}</span>
           <span>{status}</span>
        </li>
    );
}

export default ToDoItem;
