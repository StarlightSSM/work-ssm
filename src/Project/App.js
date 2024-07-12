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

import CommunityList from './pages/CommunityList';
import Community from './pages/Community';
import PostDetail from './pages/PostDetail';
import NewPostPage from './pages/NewPostPage';

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
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: '런닝 게시판',
      posts: []
    },
    {
      id: 2,
      name: '자전거 게시판',
      posts: []
    },
    {
      id: 3,
      name: '헬스 게시판',
      posts: []
    },
    {
      id: 4,
      name: '다이어트 게시판',
      posts: []
    },
    {
      id: 5,
      name: '자유 게시판',
      posts: []
    }
  ]);

  const addPost = (communityId, title, content) => {
    setCommunities(prevCommunities => {
      return prevCommunities.map(community => {
        if (community.id === parseInt(communityId)) {
          const newPost = { id: community.posts.length + 1, title, content, comments: [] };
          return { ...community, posts: [...community.posts, newPost] };
        }
        return community;
      });
    });
  };

  const addComment = (communityId, postId, text) => {
    setCommunities(prevCommunities => {
      return prevCommunities.map(community => {
        if (community.id === parseInt(communityId)) {
          const updatedPosts = community.posts.map(post => {
            if (post.id === parseInt(postId)) {
              const newComment = { id: post.comments.length + 1, text };
              return { ...post, comments: [...post.comments, newComment] };
            }
            return post;
          });
          return { ...community, posts: updatedPosts };
        }
        return community;
      });
    });
  }; // 게시판 부분 끝


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
  }); // 챌린지, 나의 운동 기록 부분 끝

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
                <Route path="/communities" element={<CommunityList communities={communities} />} />
                <Route path="/community/:communityId" element={<Community communities={communities} />} />
                <Route path="/community/:communityId/new-post" element={<NewPostPage addPost={addPost} />} />
                <Route path="/community/:communityId/post/:postId" element={<PostDetail communities={communities} addComment={addComment} />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ChallengeDispatchContext.Provider>
      </ChallengeStateContext.Provider>
    )
}

export default App;
