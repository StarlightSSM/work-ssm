import { useContext,useState,useEffect } from "react";
import axios from "axios";

function useChallenge(id){
    const [challenge, setChallenge] = useState(null);

    useEffect(()=>{
         const fetchChallenge = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/challenges/${id}`);
                setChallenge(response.data); // 새로운 챌린지 데이터로 상태 업데이트
            } catch (error) {
                console.error("Failed to fetch challenge:", error);
                setChallenge(null); 
            }
        };
        fetchChallenge(); // useEffect가 실행될 때 fetchChallenge 함수를 호출하여 데이터를 가져옴
    }, [id,challenge]); // id가 변할 때마다 useEffect가 실행되어 새로운 챌린지 데이터를 가져옴

    return challenge;
    
};
export default useChallenge;