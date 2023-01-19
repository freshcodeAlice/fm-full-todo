import React, {useState, useEffect} from 'react';
import TodoList from '../components/TodoList';
import ToDoForm from '../components/ToDoForm';
import {getTasksRequest, createTaskRequest, deleteTaskRequest, logOutRequest} from '../actions/actionCreator';
import { connect } from 'react-redux';

const TodoPage = (props) => {

    useEffect(()=>{
        props.getTasksRequest();
    }, []);

    const getNewTd = (data) => {
        props.createTaskRequest({
            status: 'new',
            ...data
        });
    }


    const delTask = (id) => {
        props.deleteTaskRequest(id);
    }

    const logOutHandler = () => {
        props.logOutRequest();
    }

    return (
        <div>
            <button onClick={logOutHandler}>LOG OUT</button>
            <h1>ToDo List</h1>
            <ToDoForm sendData={getNewTd}/>
            <TodoList todos={props.tasks} delCallback={delTask}/>
        </div>
    );
}

const mapStateToProps = ({tasks}) => ({tasks});

const mapDispatchToProps = {
    getTasksRequest, 
    createTaskRequest, 
    deleteTaskRequest,
    logOutRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
