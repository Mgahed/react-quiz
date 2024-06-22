import COMPLETE from "../assets/quiz-complete.png";
import Questions from "../questions.js";

export function Summary({userAnswers}) {
    const questionsCount = Questions.length;
    const correctAnswers = userAnswers.filter((answer, index) => Questions[index].correctAnswer === answer).length;
    const correctAnswersPercentage = Math.round((correctAnswers / questionsCount * 100));
    const wrongAnswers = userAnswers.filter((answer, index) => Questions[index].correctAnswer !== answer && answer !== null).length;
    const wrongAnswersPercentage = Math.round(wrongAnswers / questionsCount * 100);
    const skippedAnswers = userAnswers.filter((answer) => answer === null).length;
    const skippedAnswersPercentage = Math.round(skippedAnswers / questionsCount * 100);
    return (
        <div id="summary">
            <img src={COMPLETE} alt="Quiz completed"/>
            <h2>Quiz completed!</h2>
            <div id="summary-stats">
                <p>
                <span className="number">
                    {skippedAnswersPercentage}%
                </span>
                    <span className="text">skipped</span>
                </p>
                <p>
                <span className="number">
                    {correctAnswersPercentage}%
                </span>
                    <span className="text">Answered correctly</span>
                </p>
                <p>
                <span className="number">
                    {wrongAnswersPercentage}%
                </span>
                    <span className="text">Answered incorrectly</span>
                </p>
            </div>
            <ol>
                {
                    userAnswers.map((answer, index) => {
                        const question = Questions[index];
                        const isCorrect = question.correctAnswer === answer;
                        let cssClass = 'user-answer';
                        if (answer === null) {
                            cssClass += ' skipped';
                        } else if (isCorrect) {
                            cssClass += ' correct';
                        } else {
                            cssClass += ' wrong';
                        }
                        return (
                            <li key={question.id}>
                                <h3>{index + 1}</h3>
                                <p className="question">{question.text}</p>
                                <p className={cssClass}>{answer ?? 'skipped'}</p>
                            </li>
                        )
                    })
                }
            </ol>
        </div>
    )
}