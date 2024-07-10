//챌린지랑 운동기록페이지로 이동하는 임시 페이지
import React from "react";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    const goChallenge=()=>{
        navigate("/challenge",{replace:true});
    }
    const goExercise=()=>{
        navigate("/exercise" ,{replace:true});
    }
    return(
        <div>
            <button onClick={goChallenge}>챌린지</button>
            <button onClick={goExercise}>나의 운동기록</button>
        </div>

    )
}
export default Home;