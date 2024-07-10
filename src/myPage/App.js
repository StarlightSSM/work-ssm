import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import './App.css';

import MyPage from './pages/MyPage';
import Edit from './pages/Edit';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Challenge from "./pages/Challenge";

const App = () => {
    return (
        <BrowserRouter>
        <div className='App'>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signUp" element={<Signup/>}/>
                <Route path="/myPage" element={<MyPage/>}/>
                <Route path="/edit" element={<Edit/>}/>
                <Route path="/challenge" element={<Challenge/>}/>
            </Routes>
        </div>
    </BrowserRouter>
    )
}

export default App;
