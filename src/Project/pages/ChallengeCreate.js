import { useNavigate } from "react-router-dom";
import ChallengeEditor from "../components/ChallengeEditor";
import useChallengeActions from "../hooks/useChallengeActions"
import MyTabs from "../components/myTabs";  // Ensure the path is correct
import "./ChallengeCreate.css";

function ChallengeCreate() {
    const {addChallenge} = useChallengeActions();
    const navigate = useNavigate();

    const onSubmit = async(formData) => { //ChallengeEditor에서 넘어온 새로 생성한 챌린지 데이터를 서버로 전송
        try {
          await addChallenge(formData);
          console.log("챌린지 생성 성공");
          navigate('/challenge', { replace: true });
        } catch (error) {
          console.error('챌린지 생성 실패:', error);
        }
      };

    return (
        <div className="ChallengeCreate">
            <nav className="topNav">
                <li className="Logo">
                    <img className="imgLogo" src={require('../img/MainLogo.png')} alt="Logo" />
                </li>
                <li>
                    <MyTabs defaultValue="/challenge" />
                </li>
            </nav>
            <div>챌린지 만들기</div>
            <ChallengeEditor onSubmit={onSubmit} text={"등록"}></ChallengeEditor>
        </div>
    );
}

export default ChallengeCreate;