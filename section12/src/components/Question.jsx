import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

export default function Question({ questionText, answers, selectedAnswer, answerState, onSelectAnswer, onSkipAnswer }) {
  return (
    <div id='question'>
      <QuestionTimer
        timeout={1000 * 5}
        onTimeout={onSkipAnswer}
      />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}
