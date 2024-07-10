import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import LangkingList from "../components/LangkingList";
import ChallengeItem from "../components/ChallengeItem";
import { ChallengeStateContext } from "../App";
import "./Challenge.css";

function Challenge(){
    const data = useContext(ChallengeStateContext);
    const navigate = useNavigate();
    const goChallengeCreate=()=>{
        navigate('/challengecreate',{replace:true});
    }
    return(
        <div className="Challenge">
            <div className="Challenge-Langking">
                <div>챌린지 랭킹</div>
                <LangkingList/>
            </div>
            <div className="Challenge-List">
                <div>챌린지</div>
                <div className="Challenge-List-Right">
                    <input className="ChallengeSearch"></input>
                    <button type="button" className="goChallengeCreate" onClick={goChallengeCreate}>챌린지 만들러가기</button>
                </div>
                {data.map((it)=>(
                    <ChallengeItem key={it.id} {...it} />
            ))}

            </div>

        </div>
    )
}
export default Challenge;