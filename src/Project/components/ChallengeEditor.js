import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './ChallengeEditor.css';

const initialState = {
    challenge_name: "",
    description: "",
    target_period: 1,
    target_days: 1, // 기본값
    participant_count: 0,
    challenge_img: null
};

//initData는 챌린지를 수정할 때 기존 챌린지 데이터를 전달받아 미리 폼에 채울때 사용
function ChallengeEditor({initData,onSubmit,text}){
    const navigate = useNavigate();
    const [state, setState] = useState(initialState); //여기서 폼에 들어오는 내용들 관리.

    useEffect(()=>{
        if(initData) {// 초기 데이터가 주어지면 상태를 설정 . 챌린지 수정할때
            setState({
                ...initData,
            }); 
        }    
    },[initData]);

    const handleChange = (e) => { // 모든 입력 필드의 변화 처리
        const { name, value, files } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value // 파일 입력이면 files[0], 아니면 value
        }));
    };

    //파일을 보내므로 FormData를 사용함.
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("challenge_name", state.challenge_name);
        formData.append("description", state.description);
        formData.append("target_period", state.target_period);
        formData.append("target_days", state.target_days);
        formData.append("participant_count", state.participant_count);
        formData.append("challenge_img", state.challenge_img);

        try {
            await onSubmit(formData);
            console.log("Form submitted successfully");
        } catch (error) {
            console.error("Failed to submit form:", error);
        }
    };

    const handleCancel = () => {
        navigate(-1); 
    };

    return(
        <div className="ChallengeEditor">
            <div className="ChallengeCreate-Form">
                <label htmlFor="ChallengeCreate-Name">챌린지 이름</label>
                <textarea
                    id="ChallengeCreate-Name"
                    name="challenge_name"
                    placeholder="챌린지 이름을 입력하세요"
                    value={state.challenge_name}
                    onChange={handleChange}
                />
                <label htmlFor="ChallengeCreate-content">챌린지 설명</label>
                <textarea
                    id="ChallengeCreate-content"
                    name="description"
                    placeholder="상세설명을 입력하세요"
                    value={state.description}
                    onChange={handleChange}
                />

                <label htmlFor="targetPeriod">기간선택</label>
                <select
                    id="targetPeriod"
                    name="target_period"
                    value={state.target_period}
                    onChange={handleChange}
                >
                    <option value={1}>1주</option>
                    <option value={2}>2주</option>
                    <option value={3}>3주</option>
                    <option value={4}>4주</option>
                    <option value={5}>5주</option>
                    <option value={6}>6주</option>
                    <option value={7}>7주</option>
                    <option value={8}>8주</option>
                </select>

                <label htmlFor="targetFrequency">달성조건</label>
                <div className="targetFrequency">
                    {[1, 2, 3, 4, 5, 6, 7].map((targetDays) => (
                        <button
                        key={targetDays}
                        className={`targetDays-button ${state.target_days === targetDays ? "active" : ""}`}
                        onClick={() => setState((prevState) => ({
                            ...prevState,
                            target_days: targetDays
                        }))}>
                            {targetDays}번
                        </button>
                    ))}
                </div>


                <label htmlFor="challengeImg">챌린지 이미지 업로드</label>
                <input
                    type="file"
                    id="challengeImg"
                    name="challenge_img"
                    accept="image/*"
                    onChange={handleChange}
                />
                <button type="button" onClick={handleSubmit}>{text}</button>
                <button type="button" onClick={handleCancel}>취소</button>
            </div>
        </div>
    )
}
export default ChallengeEditor;