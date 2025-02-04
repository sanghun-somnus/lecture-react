import { useRef, useState } from "react";

export default function Login() {
  const [isInvalid, setIsInvalid] = useState({
    email: false,
    password: false,
  });
  const email = useRef();
  const password = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const isInvalidEmail = !email.current.value.includes("@");
    const isInvalidPassword = password.current.value.length < 8;

    if (isInvalidEmail) {
      setIsInvalid((prev) => ({
        ...prev,
        email: true,
      }));
    }
    if (isInvalidPassword) {
      setIsInvalid((prev) => ({
        ...prev,
        password: true,
      }));
    }

    if (!isInvalidEmail && !isInvalidPassword) {
      console.log("send HTTP request...");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="enter your email"
            ref={email}
          />
          <div className="control-error">
            {isInvalid.email && <p>must include @</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="enter your password"
            ref={password}
          />
          <div className="control-error">
            {isInvalid.password && <p>at least 8</p>}
          </div>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
