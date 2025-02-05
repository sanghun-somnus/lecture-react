import { useState } from "react";
import { produce } from "immer";
import Input from "./Input";

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
    entered.password.didEdit && entered.password.value.trim().length < 8;

  function handleEnteredChange(name, value) {
    setEntered(
      produce((draft) => {
        const target = draft[name];

        target.value = value;
        target.didEdit = false;
      })
    );
  }

  function handleEnteredBlur(e) {
    if (!(e.target.tagName === "INPUT")) return;

    setEntered(
      produce((draft) => {
        const target = draft[e.target.name];

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
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          placeholder="enter your email"
          value={entered.email.value}
          onChange={(e) => handleEnteredChange(e.target.name, e.target.value)}
          error={isInValidEmail && "must include @"}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          placeholder="enter your password"
          value={entered.password.value}
          onChange={(e) => handleEnteredChange(e.target.name, e.target.value)}
          minLength={8}
          error={isInValidPassword && "at least 8"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
