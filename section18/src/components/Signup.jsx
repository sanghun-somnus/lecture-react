import { useActionState } from "react";
import {
  isEmail,
  isNotEmpty,
  isEqualToOtherValue,
  hasMinLength,
} from "../util/validation";

export default function Signup() {
  const [formState, formAction, isPending] = useActionState(signupAction, {
    errors: null,
  });
  function signupAction(prev, fd) {
    /* email, password, confirm-password, first-name, last-name, role, acquisition, term */
    const data = Object.fromEntries(fd.entries());
    data.acquisition = fd.getAll("acquisition");

    console.log(data);

    let errors = [];
    if (!isEmail(data.email) || !isNotEmpty(data.email))
      errors.push("email: include @ or fill");
    if (!isNotEmpty(data.password) || !hasMinLength(data.password, 8))
      errors.push("password: at least 8");
    if (!isEqualToOtherValue(data.password, data["confirm-password"]))
      errors.push("confirm-password: equal to password");
    if (!isNotEmpty(data["first-name"]) || !isNotEmpty(data["last-name"]))
      errors.push("name: fill");
    if (!isNotEmpty(data.role)) errors.push("role: must");
    if (data.acquisition.length === 0)
      errors.push("acquisition: check at least 1");
    if (!data.terms) errors.push("terms: must check");

    if (errors.length > 0) {
      return {
        errors,
        entered: {
          ...data,
          acquisition: [...data.acquisition],
        },
      };
    }
    return { errors: null };
  }
  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={formState.entered?.email}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={formState.entered?.password}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.entered?.["confirm-password"]}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            defaultValue={formState.entered?.["first-name"]}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={formState.entered?.["last-name"]}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select
          id="role"
          name="role"
          defaultChecked={formState.entered?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.entered?.acquisition.includes("google")}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.entered?.acquisition.includes("friend")}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            defaultChecked={formState.entered?.acquisition.includes("other")}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            defaultChecked={!!formState.entered?.terms}
          />
          I agree to the terms and conditions
        </label>
      </div>

      {/* error */}
      {!!formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button
          type="reset"
          className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
