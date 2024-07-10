import { useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function ExerciseDiary () {
    const [value, onChange] = useState(new Date()); //초깃값은 현재 날짜
    const [diaryEntries, setDiaryEntries] = useState({});

    const handleDiaryChange = (e) => {
        setDiaryEntries({
            ...diaryEntries,
            [value.toDateString()]: e.target.value,
        });
    };

    const selectedDiary = diaryEntries[value.toDateString()] ||'';
    return(
        <div>
            <div>나의 운동기록 매일쓰기</div>

            <Calendar onChange={onChange} value={value} />
            <div>
                <h3>선택된 날짜: {value.toDateString()}</h3>
                <textarea
                    placeholder='일기를 입력하세요'
                    value={selectedDiary}
                    onChange={handleDiaryChange}
                />
            </div>
            <div>
                <h3>저장된일기:</h3>
                {Object.entries(diaryEntries).map(([date,entry]) => (
                    <div key={date}>
                        <strong>{date}</strong>
                        <p>{entry}</p>
                    </div>
                ))}
            </div>

        </div>

    )
}
export default ExerciseDiary;

