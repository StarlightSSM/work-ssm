import React, {useReducer, useRef, useEffect} from 'react';
import {Routes, Route, BrowserRouter, Router} from 'react-router-dom';

import './App.css';

import MyPage from './pages/MyPage';
import Edit from './pages/Edit';

const App = () => {
    return (
        <BrowserRouter>
        <div className='App'>
            <Routes>
                <Route path="/myPage" element={<MyPage/>}/>
                <Route path="/edit" element={<Edit/>}/>
            </Routes>
        </div>
    </BrowserRouter>
    )
}

export default App;
