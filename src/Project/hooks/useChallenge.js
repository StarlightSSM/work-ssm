import { useContext,useState,useEffect } from "react";
import { ChallengeStateContext } from "../App";
import { useNavigate } from "react-router-dom";

function useChallenge(id){
    const data = useContext(ChallengeStateContext);
    const [challenge, setChallenge] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const matchChallenge = data.find((it) => String(it.id) === String(id));
        if(matchChallenge) {
            setChallenge(matchChallenge);
        } else {
            alert("챌린지가 존재하지 않습니다");
            navigate("/",{replace:true});
        }
    },[id,data,navigate]);
    return challenge;
};
export default useChallenge;