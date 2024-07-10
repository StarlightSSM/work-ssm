import { useNavigate } from 'react-router-dom';
import './ChallengeItem.css';

function ChallengeItem({id,challengename,participantCount}){
    const navigate = useNavigate();

    const goDetail = () => {
        navigate(`/challengeDetail/${id}`);
    }

    return(
        <div className="ChallengeItem" onClick={goDetail}>
            <div className="challengeItem-name">{challengename}</div>
            <div className="challengeItem-participant">{participantCount}명 </div>
        </div>
    )
}
export default ChallengeItem;