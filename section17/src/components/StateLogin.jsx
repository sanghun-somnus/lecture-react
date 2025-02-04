import { useState } from "react";
import { produce } from "immer";

export default function Login() {
  const [entered, setEntered] = useState({
    email: {
      value: "",
      didEdit: false,
    },
    password: {
      value: "",
      didEdit: false,
    },
  });

  // validation
  const isInValidEmail =
    entered.email.didEdit && !entered.email.value.includes("@");
  const isInValidPassword =
    entered.password.didEdit && entered.password.value.length < 8;

  function handleEnteredChange(e) {
    setEntered(
      produce((draft) => {
        const target = draft[e.target.name];

        target.value = e.target.value;
        target.didEdit = false;
      })
    );
  }

  function handleEnteredBlur(e) {
    if (!(e.target.tagName === "INPUT")) return;

    setEntered(
      produce((draft) => {
        const target = draft[e.target.name];

        console.log(target);
        target.didEdit = true;
      })
    );
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      onBlur={handleEnteredBlur}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="enter your email"
            value={entered.email.value}
            onChange={handleEnteredChange}
          />
          <div className="control-error">
            {isInValidEmail && <p>must include @</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="enter your password"
            value={entered.password.value}
            onChange={handleEnteredChange}
          />
          <div className="control-error">
            {isInValidPassword && <p>at least 8</p>}
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
