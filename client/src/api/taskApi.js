import CONSTANTS from '../constants';


export const getTasks = async (userId) => {
    const responce = await fetch(`${CONSTANTS.API_BASE}/tasks/${userId}`);
    if (responce.status === 400) {
        const error = await responce.json();
        return Promise.reject(error);
       }
   
       return responce.json();
   
}


export const createTask = async (data) => {
    const responce = await fetch(`${CONSTANTS.API_BASE}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
    });
    if (responce.status === 400) {
     const error = await responce.json();
     return Promise.reject(error);
    }

    return responce.json();

}

/*
POST http://localhost:5000/api/tasks/ HTTP/1.1
Content-Type: application/json

{
   "authorId": "63b7df8e9ed414608c5495d4",
   "body": "First todo",
   "createdAt": "2023-02-02",
   "deadline": "2023-02-02",
   "status": "done"
}


*/