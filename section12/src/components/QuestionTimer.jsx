import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout = 1000 * 15, onTimeout }) {
  const [remainedTime, setRemainedTime] = useState(timeout);

  useEffect(() => {
    setTimeout(onTimeout, timeout);
  }, [timeout, onTimeout]);

  useEffect(() => {
    setInterval(() => {
      setRemainedTime((prev) => prev - 100);
    }, 100);
  }, []);

  return (
    <progress
      id='question-time'
      max={timeout}
      value={remainedTime}
    />
  );
}
