import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ChallengeDispatchContext } from "../App";
import ChallengeEditor from "../components/ChallengeEditor";
import MyTabs from "../components/myTabs";  // Ensure the path is correct
import "./ChallengeCreate.css";

function ChallengeCreate() {
    const { onCreate } = useContext(ChallengeDispatchContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const { challengename, description, targetDays, participantCount } = data;
        onCreate(challengename, description, targetDays, participantCount);
        navigate("/challenge", { replace: true });
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
