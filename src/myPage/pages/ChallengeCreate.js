import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ChallengeDispatchContext } from "../App";
import ChallengeEditor from "../components/ChallengeEditor";
import "./ChallengeCreate.css";

function ChallengeCreate(){
    const {onCreate} = useContext(ChallengeDispatchContext)
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const {challengename,description,targetDays,participantCount} = data; 
        onCreate(challengename,description,targetDays,participantCount);
        navigate("/challenge",{replace:true});
    }
    return(
        <div className="ChallengeCreate">
            <div>챌린지 만들기</div>
            <ChallengeEditor onSubmit={onSubmit} text={"등록"}></ChallengeEditor>
        </div>
    )

}
export default ChallengeCreate;