import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home/Home';
import TodoPage from './pages/TodoPage';
import './App.css';
import {authUser} from './api/userApi';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home sendUser={setUser}/>} />
          <Route path="/tasks" element={<Dashboard user={user} sendUser={setUser}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
