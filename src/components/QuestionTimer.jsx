import {useEffect, useState} from "react";

export function QuestionTimer({timeOut, onTimeOut, mode}) {
    const [remainingTime, setRemainingTime] = useState(timeOut);

    useEffect(() => {
        const timeOutTimer = setTimeout(onTimeOut, timeOut);

        return () => {
            clearTimeout(timeOutTimer);
        }
    }, [timeOut, onTimeOut]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 10);
        }, 10);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <>
            <progress
                id="question-time"
                value={remainingTime}
                max={timeOut}
                className={mode}
            />
        </>
    )
}