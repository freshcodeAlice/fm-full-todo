import CONSTANTS from '../constants';
import history from '../BrowserHistory';
import {refreshSession} from './userApi';

export const getTasks = async () => {
    console.log('get tasks');
    const accessToken = localStorage.getItem('accessToken');
    const responce = await fetch(`${CONSTANTS.API_BASE}/tasks/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    if (responce.status === 400) {
        const error = await responce.json();
        return Promise.reject(error);
       }
       if (responce.status === 403) {
        console.log('HERE WE GO');
        await refreshSession();
        return await getTasks();
//        const error = await responce.json();
 //        history.push('/');
 //       return Promise.reject(error);
        }
       return responce.json();
   
}


export const createTask = async (data) => {
    const accessToken = localStorage.getItem('accessToken');
    const responce = await fetch(`${CONSTANTS.API_BASE}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify(data)
    });
    if (responce.status === 400) {
     const error = await responce.json();
     return Promise.reject(error);
    }
    if (responce.status === 403) {
        await refreshSession();
        return await createTask(data); 
 //       const error = await responce.json();
       //  history.push('/');
 //       return Promise.reject(error);
    }


    return responce.json();

}




export const deleteTask = async (taskId) => {
    const accessToken = localStorage.getItem('accessToken');
    const responce = await fetch(`${CONSTANTS.API_BASE}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
    });
    if (responce.status === 400) {
     const error = await responce.json();
     return Promise.reject(error);
    }
    if (responce.status === 403) {
        await refreshSession();
        return await deleteTask(taskId); 
 //       const error = await responce.json();
       //  history.push('/');
 //       return Promise.reject(error);
    }


    return responce.json();

}
