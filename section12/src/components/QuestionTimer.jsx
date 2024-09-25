import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout = 1000 * 15, onTimeout, mode }) {
  const [remainedTime, setRemainedTime] = useState(timeout);

  useEffect(() => {
    const timerId = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timerId);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainedTime((prev) => prev - 100);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <progress
      id='question-time'
      max={timeout}
      value={remainedTime}
      className={mode}
    />
  );
}
