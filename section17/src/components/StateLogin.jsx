import Input from "./Input";
import { useInput } from "../hooks/useInput";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";

export default function Login() {
  const {
    entered: email,
    hasError: emailHasError,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));
  const {
    entered: password,
    hasError: passwordHasError,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
  } = useInput("", (value) => hasMinLength(value, 8));

  function handleSubmit(e) {
    e.preventDefault();

    if (emailHasError || passwordHasError) {
      console.log("not pass validation");
      return;
    }
    console.log("pass validation");
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          placeholder="enter your email"
          value={email.value}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailHasError && "must include @"}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          placeholder="enter your password"
          value={password.value}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          minLength={8}
          error={passwordHasError && "at least 8"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
