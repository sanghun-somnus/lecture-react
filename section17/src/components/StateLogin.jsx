import { useState } from "react";

export default function Login() {
  const [entered, setEntered] = useState({
    email: "",
    password: "",
  });

  function handleEnteredChange(e) {
    const identifer = e.target.name;
    // Todo: remove test code
    console.log(`[${identifer}] ${e.target.value}`);
    setEntered((prev) => ({
      ...prev,
      [identifer]: e.target.value,
    }));
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="enter your email"
            value={entered.email}
            onChange={handleEnteredChange}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="enter your password"
            value={entered.password}
            onChange={handleEnteredChange}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
