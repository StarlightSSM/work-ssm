import { useNavigate } from 'react-router-dom';
import './ChallengeItem.css';

function ChallengeItem({challenge_id,challenge_img,challenge_name,participant_count}){
    const navigate = useNavigate();

    const goDetail = () => {
        navigate(`/challengeDetail/${challenge_id}`);
    }

    return(
        <div className="ChallengeItem" onClick={goDetail}>
            <div className='ChallengeItem-img'>
                <img src={`http://localhost:3001/${challenge_img}`} alt={challenge_name}/>
            </div>
            <div className="challengeItem-name">{challenge_name}</div>
            <div className="challengeItem-participant">{participant_count}명 도전중 </div>
        </div>
    )
}

export default ChallengeItem;