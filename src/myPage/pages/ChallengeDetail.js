import { useNavigate, useParams } from "react-router-dom";
import useChallenge from "../hooks/useChallenge";
import MyTabs from "../components/myTabs";

import './ChallengeDetail.css';

function ChallengeDetail(){
    const {id} = useParams();
    const challenge = useChallenge(id);

    const navigate = useNavigate();

    const goHome = () => {
        navigate(`/`);
    }

    if (!challenge){
        return <div>프로젝트를 찾을 수 없습니다.</div>
    }
    const {challengename,description,participantCount,targetDays} = challenge;

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
                <div className="ChallengeTitle-name">{challengename}</div>
                <div className="ChallengeTitle-count">{participantCount}명 도전중</div>
            </div>
            <div>{description}</div>
            <div>달성조건 : 주 {targetDays}일</div>
            <button>참여하기</button>
        </div>
        </div>
    )
}
export default ChallengeDetail;