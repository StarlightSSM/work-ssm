import { useState,useEffect } from "react";

function ChallengeEditor({initData,onSubmit,text}){
    
    const [state,setState] = useState({
        challengename:"",
        description:"",
        targetDays:"",
        participantCount:"몇 "
    });

    useEffect(()=>{
        if(initData) {//처음 내용
            setState({
                ...initData,
            }); 
        }    
    },[initData]);

    const handleChangeChallengename = (e)=>{
        setState({
            ...state,
            challengename:e.target.value
        })
    }

    const handleChangeDescription = (e)=>{
        setState({
            ...state,
            description:e.target.value
        })
    }

    const handleChangeTargetDays = (e)=>{
        setState({
            ...state,
            targetDays:e.target.value
        })
    }

    const handleSubmit = ()=>{
        onSubmit(state);
    }

    return(
        <div className="ChallengeEditor">
            <div className="ChallengeCreate-Form">
                <label htmlFor="ChallengeCreate-Name">챌린지 이름</label>
                <textarea
                    id="ChallengeCreate-Name"
                    placeholder="챌린지 이름을 입력하세요"
                    value={state.challengename}
                    onChange={handleChangeChallengename}
                />
                <label htmlFor="ChallengeCreate-content">챌린지 설명</label>
                <textarea
                    id="ChallengeCreate-content"
                    placeholder="상세설명을 입력하세요"
                    value={state.description}
                    onChange={handleChangeDescription}
                />
                <label htmlFor="targetFrequency">목표 달성 횟수</label>
                <select id="targetFrequency" value={state.targetDays} 
                    onChange={handleChangeTargetDays}>
                    <option value="1">주 1일</option>
                    <option value="2">주 2일</option>
                    <option value="3">주 3일</option>
                    <option value="4">주 4일</option>
                    <option value="5">주 5일</option>
                    <option value="6">주 6일</option>
                    <option value="7">매일</option>
                </select>
                <button onClick={handleSubmit} >{text}</button>
            </div>
        </div>

    )
}
export default ChallengeEditor;