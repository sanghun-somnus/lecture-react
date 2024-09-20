import { useState } from "react";

import QuestionTimer from "./QuestionTimer";

import QUESTIONS from "../data";
import completeLogo from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

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

  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswers((prev) => [...prev, selectedAnswer]);
  };

  const suffledAnswers = QUESTIONS[activeQuestionIndex].answers.sort(() => Math.random() - 0.5);

  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimer
          timeout={1000 * 15}
          onTimeout={() => handleSelectAnswer(null)}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {suffledAnswers.map((answer) => (
            <li
              key={answer}
              className='answer'
            >
              <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
