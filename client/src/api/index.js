import {API_BASE} from '../constants';


export const registerUser = (data) => {
    return fetch(`${API_BASE}/user/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
    }).then(res => res.json());
}