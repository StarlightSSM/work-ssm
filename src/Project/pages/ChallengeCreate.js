import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ChallengeDispatchContext } from "../App";
import ChallengeEditor from "../components/ChallengeEditor";
import MyTabs from "../components/myTabs";  // Ensure the path is correct
import "./ChallengeCreate.css";

function ChallengeCreate() {
    const {addChallenge} = useContext(ChallengeDispatchContext);
    const navigate = useNavigate();

    const onSubmit = async(formData) => { //ChallengeEditor에서 넘어온 새로 생성한 챌린지 데이터를 서버로 전송
        try {
          await addChallenge(formData);
          alert('챌린지 등록이 완료되었습니다');
          navigate('/challenge', { replace: true });
        } catch (error) {
          console.error('Failed to create challenge:', error);
          alert('챌린지 생성에 실패했습니다. 나중에 다시 시도해주세요.');
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