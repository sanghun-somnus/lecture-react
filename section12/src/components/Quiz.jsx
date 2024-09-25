// hook
import { useState, useCallback } from "react";

// components
import Question from "./Question";

// assets
import QUESTIONS from "../data";
import completeLogo from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // event handlers
  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prev) => [...prev, selectedAnswer]);
  }, []);

  console.log(userAnswers);
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

  return (
    <div id='quiz'>
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
