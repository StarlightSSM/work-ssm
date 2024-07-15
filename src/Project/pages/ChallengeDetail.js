import { useNavigate, useParams } from "react-router-dom";
import useChallenge from "../hooks/useChallenge";
import axios from "axios";
import MyTabs from "../components/myTabs";

import './ChallengeDetail.css';

function ChallengeDetail(){
    const {id} = useParams();
    const challenge = useChallenge(id); // useChallenge 훅을 호출하여 챌린지 정보를 가져옴

    const navigate = useNavigate();

    const goHome = () => {
        navigate(`/`);
    }

    const joinChallenge = async ()=>{
        try {
            const userId =1; //임의로 userId설정
            const challengeId = parseInt(id, 10);// useParams로 가져온 id를 정수로 변환

            const response = await axios.post('http://localhost:5000/participants', {
                user_id: userId,
                challenge_id: challengeId
            });
            console.log("Joined challenge:", response.data);
            alert("챌린지에 참가했습니다.");
            navigate('/challenge');
        } catch (error) {
            console.error("Failed to join challenge:", error.response.data);
            if( error.response.data.error === '이미 참가한 챌린지입니다.') {
                alert("이미 참가한 챌린지입니다.");
            }else {
                alert("챌린지 참가에 실패했습니다. 나중에 다시 시도해주세요.");
            }
        }
    };

    if (!challenge){
        return <div>프로젝트를 찾을 수 없습니다.</div>
    }
    const {challenge_name,description,participant_count,target_days,challenge_img} = challenge;

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
            <div className="ChallengeDetail">
                <div className="ChallengeTitle">
                    <div className="ChallengeTitle-name">{challenge_name}</div>
                    <div className="ChallengeTitle-count">{participant_count}명 도전중</div>
                </div>
                <img src={`http://localhost:5000/${challenge_img}`} alt={challenge_name} className="challengeDetail-img"/>
                <div>{description}</div>
                <div>달성조건 : 주 {target_days}일</div>
                <button onClick={joinChallenge}>참여하기</button>
            </div>
        </div>
    )
}