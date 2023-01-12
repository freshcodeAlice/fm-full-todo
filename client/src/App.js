import React, {useState, useEffect} from 'react';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home/Home';
import TodoPage from './pages/TodoPage';
import './App.css';
import {authUser} from './api/userApi';

import history from './BrowserHistory';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(!user) {
            //// робимо запит на отримання юзера
            authUser()
            .then(userData => {
              // props.sendUser(userData.data);
              setUser(userData.data);
            }).catch(error => {
                // якщо токен невалідний - перенаправляємо на авторизацію
                console.log('INVALID');
                history.push('/');
            })
        }
   
}, []);


  return (
    <HistoryRouter history={history}>
      <Routes>
          <Route path="/" element={<Home sendUser={setUser}/>} />
          <Route path="/tasks" element={<TodoPage user={user}/>} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
