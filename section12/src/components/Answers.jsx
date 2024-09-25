import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const suffledAnswers = useRef();

  if (!suffledAnswers.current) {
    suffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
  }

  return (
    <ul id='answers'>
      {suffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
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
              onClick={() => onSelect(answer)}
              className={classes}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
