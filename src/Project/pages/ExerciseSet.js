import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyTabs from "../components/myTabs";
import './ExerciseSet.css';

function ExerciseSet({goal,setGoal}){

    const [tempGoal, setTempGoal] = useState({ //입력할때 일시적으로 값 입력
        height: "",
        weight: "",
        BMI: "",
      });
    
      useEffect(() => {
        if (goal) {
          setTempGoal({
            height: goal.height,
            weight: goal.weight,
            BMI: goal.BMI,
          });
        }
      }, [goal]);
    
    const navigate = useNavigate();

    const handleChangeHeight = (e)=>{
        setTempGoal({
            ...tempGoal,
            height:e.target.value
        })
    }

    const handleChangeWeight = (e)=>{
        setTempGoal({
            ...tempGoal,
            weight:e.target.value
        })
    }

    const handleChangeBMI = (e)=>{
        setTempGoal({
            ...tempGoal,
            BMI:e.target.value
        })
    }
    
    const onSetGoal = (e)=>{
        setGoal(tempGoal);
        navigate('/exercise',{replace:true});
    }
    
    const goBack = (e)=>{
        navigate('/exercise',{replace:true});
    }

    const goHome = () => {
        navigate(`/`);
    }

    return(
        <div>
            <nav className="topNav">
                <li className="Logo" onClick={goHome}>
                    <img className="imgLogo" src={require('../img/MainLogo.png')} alt="Logo" />
                </li>
                <li>
                 <MyTabs />
                </li>
            </nav>
            <div className="ExerciseSet">
            <div>나의 운동기록 목표설정</div>
                <div className="ExerciseSet-content">
                    <label htmlFor="height">키</label>
                    <input 
                        id="height"
                        placeholder="cm"
                        value={tempGoal.height}
                        onChange={handleChangeHeight}
                    />
                    <label htmlFor="weight">몸무게</label>
                    <input 
                        id="weight"
                        placeholder="kg"
                        value={tempGoal.weight}
                        onChange={handleChangeWeight}
                    />
                    <label htmlFor="BMI">BMI</label>
                    <input 
                        id="BMI"
                        placeholder="BMI"
                        value={tempGoal.BMI}
                        onChange={handleChangeBMI}
                    />
            </div>
            <button onClick={onSetGoal}>등록</button>
            <button onClick={goBack}>취소</button>
        </div>
        </div>
    )
}
export default ExerciseSet;

