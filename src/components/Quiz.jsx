import {useCallback, useState} from "react";

import QUESTIONS from "../questions.js";
import COMPLETE from "../assets/quiz-complete.png";
import {Question} from "./Question.jsx";
import {Summary} from "./Summary.jsx";

export function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const finished = userAnswers.length === QUESTIONS.length;

    const handleSelectAnswer = useCallback(
        function handleSelectAnswer(selectedAnswer) {
            setUserAnswers((prevAnswers) => {
                return [...prevAnswers, selectedAnswer];
            });
        }, []
    );

    const handleSkipQuestion = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (finished) {
        return <Summary userAnswers={userAnswers}/>;
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionIndex={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipQuestion={handleSkipQuestion}
            />
        </div>
    )
}