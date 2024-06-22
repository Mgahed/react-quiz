import {QuestionTimer} from "./QuestionTimer.jsx";
import QUESTIONS from "../questions.js";
import {Answers} from "./Answers.jsx";
import {useState} from "react";

export function Question(
    {
        questionIndex,
        onSelectAnswer,
        onSkipQuestion,
    }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000;
    if (answer.selectedAnswer) {
        timer = 1000;
    }
    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[questionIndex].correctAnswer === answer
            });
            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }
    return (
        <div id="question">
            <QuestionTimer
                key={timer}
                timeOut={timer}
                onTimeOut={answer.selectedAnswer === '' ? onSkipQuestion : null}
                mode={answerState}
            />
            <h2>
                {QUESTIONS[questionIndex].text}
            </h2>
            <Answers
                answers={QUESTIONS[questionIndex].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelectedAnswer={handleSelectAnswer}
            />
        </div>
    )
}