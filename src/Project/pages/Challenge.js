import { useNavigate, Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { ChallengeStateContext, ChallengeDispatchContext } from '../App';
import LangkingList from "../components/LangkingList";
import ChallengeItem from "../components/ChallengeItem";
import MyTabs from '../components/myTabs';
import "./Challenge.css";

function Challenge(){
    const data = useContext(ChallengeStateContext);
    const dispatch = useContext(ChallengeDispatchContext);
    const [search,setSearch] = useState('');
  
    // 페이지 진입 시 챌린지 데이터 요청
    useEffect(() => {

            const fetchChallenges = async () => {
                try {
                  const response = await axios.get('http://localhost:5000/challenges');
                  dispatch({ type: 'INIT_CHALLENGE', data: response.data });
                } catch (error) {
                  console.error('Failed to fetch challenges:', error);
                }
              };
              fetchChallenges();

    }, [dispatch]); //dispatch함수가 변경될때마다 fetchChallenges함수가 실행
    
    const navigate = useNavigate();
    const goChallengeCreate=()=>{
        navigate('/challengecreate',{replace:true});
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // 검색어에 따라 데이터를 필터링
    const filteredChallenges = data.filter(challenge =>
        challenge.challenge_name.toLowerCase().includes(search.toLowerCase())
    );

    console.log("Challenges data:", data); // 데이터 출력
    return(
        <div>
            <nav className="topNav">
                <li className="Logo">
                    <img className="imgLogo" src={require('../img/MainLogo.png')} alt="Logo" />
                </li>
                <li>
                    <MyTabs />
                </li>
            </nav>
            <div className="Challenge">
                <div className="Challenge-Langking">
                    <div>챌린지 랭킹</div>
                    <LangkingList/>
                </div>
                <div className="Challenge-List">
                    <div>챌린지</div>
                    <div className="ChallengeSearchContainer">
                        <input className="ChallengeSearch" placeholder="챌린지를 찾아보세요" value={search} onChange={handleSearchChange}/>
                        {search && ( //검색결과가 있을시에만 렌더링
                            <ul className="ChallengeSearchResults">
                                {filteredChallenges.map((it) => (
                                    <li key={it.challenge_id}>
                                        <Link to={`/challengeDetail/${it.challenge_id}`}>{it.challenge_name}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="challenge-items-list">
                    {data.map((it)=>(
                        <ChallengeItem key={it.challenge_id} {...it} />
                    ))}
                </div>
                <button type="button" className="goChallengeCreate" onClick={goChallengeCreate}>챌린지 만들러가기</button>
            </div>
        </div>
    )
}
export default Challenge;