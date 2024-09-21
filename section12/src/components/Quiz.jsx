// hook
import { useState, useCallback } from "react";

// components
import QuestionTimer from "./QuestionTimer";

// assets
import QUESTIONS from "../data";
import completeLogo from "../assets/quiz-complete.png";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // event handlers
  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState("answered");
      setUserAnswers((prev) => [...prev, selectedAnswer]);

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 1000 * 2);
      }, 1000 * 1);
    },
    [activeQuestionIndex]
  );
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div id='summary'>
        <img
          src={completeLogo}
          alt='Trophy icon'
        />
        <h2>quiz complete!</h2>
      </div>
    );
  }

  const suffledAnswers = QUESTIONS[activeQuestionIndex].answers.sort(() => Math.random() - 0.5);

  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={1000 * 5}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {suffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let classes = "";

            if (answerState === "answered" && isSelected) {
              classes += "selected";
            }
            if ((answerState === "correct" || answerState === "wrong") && isSelected) {
              classes += answerState;
            }

            return (
              <li
                key={answer}
                className='answer'
              >
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={classes}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
