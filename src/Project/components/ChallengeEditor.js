import { useState,useEffect } from "react";

function ChallengeEditor({initData,onSubmit,text}){
    const [state,setState] = useState({
        challenge_name:"",
        description:"",
        target_days:1,//기본값
        participant_count:0,
        challenge_img:null
    });

    useEffect(()=>{
        if(initData) {//처음 내용
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

                <label htmlFor="targetFrequency">목표 달성 횟수</label>
                <select
                    id="targetFrequency"
                    name="target_days"
                    value={state.target_days}
                    onChange={handleChange}
                >

                    <option value={1}>주 1일</option>
                    <option value={2}>주 2일</option>
                    <option value={3}>주 3일</option>
                    <option value={4}>주 4일</option>
                    <option value={5}>주 5일</option>
                    <option value={6}>주 6일</option>
                    <option value={7}>매일</option>
                </select>
                <label htmlFor="challengeImg">챌린지 이미지 업로드</label>
                <input
                    type="file"
                    id="challengeImg"
                    name="challenge_img"
                    accept="image/*"
                    onChange={handleChange}
                />

                <button onClick={handleSubmit}>{text}</button>
            </div>
        </div>
    )
}

export default ChallengeEditor;