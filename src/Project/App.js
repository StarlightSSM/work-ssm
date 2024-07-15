import React, {useReducer, useEffect, useState} from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import axios from 'axios';

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

function reducer(state,action) {
  switch(action.type){
    case "INIT_CHALLENGE": {
      return action.data;
    }
    case "CREATE_CHALLENGE": {
      return [ action.data,...state, ];
    }
    case "UPDATE_CHALLENG": {
      return state.map((it) =>
        String(it.challenge_id)===String(action.data.challenge_id) ? {...action.data}:it
      )
    }
    case "DELETE_CHALLENGE": {
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


  const [challenges,dispatch] = useReducer(reducer, []); //챌린지

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/challenges'); // 서버에서 데이터 가져오기
        console.log("Fetched Data: ", response.data);
        dispatch({
          type: "INIT_CHALLENGE",
          data: response.data
        });
      } catch (error) {
        console.error("Failed to fetch challenges:", error);
      }
    };
    fetchData();
  }, []);
  const addChallenge = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/challenges', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch({ type: "CREATE_CHALLENGE", data: response.data }); //challenges에 새로 생성된 챌린지 데이터 추가
    } catch (error) {
      console.error("Failed to create challenge:", error);
      alert("챌린지 생성에 실패했습니다. 나중에 다시 시도해주세요.");
    }
  };
  const updateChallenge = async (id, formData) => {
    try {
      const response = await axios.put(`http://localhost:5000/challenges/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch({ type: "UPDATE_CHALLENGE", data: response.data });
      console.log("Challenge updated:", response.data);
    } catch (error) {
      console.error("Failed to update challenge:", error);
      alert("챌린지 업데이트에 실패했습니다. 나중에 다시 시도해주세요.");
    }
  }
  const deleteChallenge = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/challenges/${id}`);
      dispatch({ type: "DELETE_CHALLENGE", id });
      console.log("Challenge deleted:", id);
    } catch (error) {
      console.error("Failed to delete challenge:", error);
      alert("챌린지 삭제에 실패했습니다. 나중에 다시 시도해주세요.");
    }
  };
  //goal은 props로 전달
  const [goal, setGoal] = useState({
    height: "",
    weight: "",
    BMI: "",
  }); // 챌린지, 나의 운동 기록 부분 끝
    return (
        <ChallengeStateContext.Provider value={challenges}>
        <ChallengeDispatchContext.Provider value={{addChallenge, updateChallenge, deleteChallenge}}>
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