import React, {useReducer, useRef, useEffect, useState} from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import './App.css';

import MyPage from './pages/MyPage';
import Edit from './pages/Edit';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Challenge from "./pages/Challenge";
import Home from "./pages/Home";
import ChallengeCreate from "./pages/ChallengeCreate";
import ChallengeDetail from "./pages/ChallengeDetail";
import Exercise from "./pages/Exercise";
import ExerciseDiary from "./pages/ExerciseDiary";
import ExerciseSet from "./pages/ExerciseSet";

function reducer(state,action) { //챌린지 생성할때 쓰이는 동작함수들
    switch(action.type){
      case "INIT": {
        return action.data;
      }
      case "CREATE": {
        return [action.data, ...state];
      }
      case "UPDATE": {
        return state.map((it) =>
          String(it.id)===String(action.data.id) ? {...action.data}:it
        )
      }
      case "DELETE": {
        return state.filter((it) => String(it.id) !== String(action.targetId));
      }
      default: {
        return state;
      }
    }
  }

export const ChallengeStateContext = React.createContext();
export const ChallengeDispatchContext = React.createContext();

const App = () => {
    const [state,dispatch] = useReducer(reducer, []); //챌린지
  const idRef = useRef(5); //챌린지 아이디, 즉 챌린지 개수

  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await fetch('./challenge.json');
      const result = await response.json();
      dispatch({
        type:"INIT",
        data:result
      })
    }
    fetchData();
  },[]);

  const onCreate = (challengename,description,targetDays,participantCount)=>{
    dispatch({
      type:"CREATE",
      data: {
        id: idRef.current,
        challengename,
        description,
        targetDays,
        participantCount
      }
    });
    idRef.current +=1;
  };

  const onUpdate = (id,challengename,description,targetDays,participantCount)=>{
    dispatch({
      type:"UPDATE",
      data:{
        id,
        challengename,
        description,
        targetDays,
        participantCount
      }
    });
  };

  const onDelete = (targetId)=>{
    dispatch({
      type:"DELETE",
      targetId
    });
  };

  //goal은 props로 전달
  const [goal, setGoal] = useState({
    height: "",
    weight: "",
    BMI: "",
  });

    return (
        <ChallengeStateContext.Provider value={state}>
        <ChallengeDispatchContext.Provider value={{onCreate,onUpdate,onDelete}}>
          <BrowserRouter>
            <div className='App'>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/challenge' element={<Challenge/>}/>
                <Route path="/challengeDetail/:id" element={<ChallengeDetail/>}/>
                <Route path="/challengecreate" element={<ChallengeCreate/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signUp" element={<Signup/>}/>
                <Route path="/myPage" element={<MyPage/>}/>
                <Route path="/edit" element={<Edit/>}/>
                <Route path="/exercise" element={<Exercise goal={goal}/>}/>
                <Route path="/exercisediary" element={<ExerciseDiary/>}/>
                <Route path="/exerciseset" element={<ExerciseSet goal={goal} setGoal={setGoal}/>}/>
              </Routes>
            </div>
          </BrowserRouter>
        </ChallengeDispatchContext.Provider>
      </ChallengeStateContext.Provider>
    )
}

export default App;
