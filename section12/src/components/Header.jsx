import quizLogo from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img
        src={quizLogo}
        alt='quiz logo'
      />
      <h1>react quiz</h1>
    </header>
  );
}
