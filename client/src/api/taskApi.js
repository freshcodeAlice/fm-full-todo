import CONSTANTS from '../constants';


export const getTasks = async () => {
    const token = localStorage.getItem('token');
    const responce = await fetch(`${CONSTANTS.API_BASE}/tasks/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (responce.status === 400) {
        const error = await responce.json();
        return Promise.reject(error);
       }
   
       return responce.json();
   
}


export const createTask = async (data) => {
    const token = localStorage.getItem('token');
    const responce = await fetch(`${CONSTANTS.API_BASE}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
    });
    if (responce.status === 400) {
     const error = await responce.json();
     return Promise.reject(error);
    }

    return responce.json();

}
