import { useContext } from 'react';
import axios from 'axios';
import { ChallengeDispatchContext } from '../App';

const useChallengeActions = () => {
  const dispatch = useContext(ChallengeDispatchContext);

  console.log("Dispatch: ", dispatch);

  const addChallenge = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/challenges', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch({ type: 'CREATE_CHALLENGE', data: response.data });
      console.log('챌린지 생성 성공');
    } catch (error) {
      console.error("Failed to create challenge:", error);
      alert("챌린지 생성에 실패했습니다. 나중에 다시 시도해주세요.");
    }
  };

  const updateChallenge = async (id, formData) => {
    try {
      const response = await axios.put(`http://localhost:5000/challenges/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      dispatch({ type: 'UPDATE_CHALLENGE', data: response.data });
    } catch (error) {
      console.error("Failed to update challenge:", error);
      alert("챌린지 업데이트에 실패했습니다. 나중에 다시 시도해주세요.");
    }
  };

  const deleteChallenge = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/challenges/${id}`);
      dispatch({ type: 'DELETE_CHALLENGE', id });
    } catch (error) {
      console.error("Failed to delete challenge:", error);
      alert("챌린지 삭제에 실패했습니다. 나중에 다시 시도해주세요.");
    }
  };

  const joinChallenge = async (challengeId, userId) => {
    try {
      const response = await axios.post('http://localhost:5000/participants', {
        user_id: userId,
        challenge_id: challengeId
      });
      dispatch({ type: 'JOIN_CHALLENGE', data: response.data });
    } catch (error) {
      console.error("Failed to join Challenge:", error);
    }
  };

  return {
    addChallenge,
    updateChallenge,
    deleteChallenge,
    joinChallenge
  };
};

export default useChallengeActions;
