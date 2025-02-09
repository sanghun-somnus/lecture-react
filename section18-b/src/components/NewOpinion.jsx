import { useActionState } from "react";
import { isEmpty } from "../utils/validate";
import { OpinionsContext } from "../store/opinions-context";
import { use } from "react";
import SubmitButton from "./SubmitButton";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);
  const [formState, formAction, isPending] = useActionState(actionFn, {
    errors: null,
  });

  async function actionFn(prevState, fd) {
    // userName, title, body
    const data = Object.fromEntries(fd.entries());

    let errors = [];

    // validation : isEmpty
    for (let [key, value] of Object.entries(data)) {
      if (isEmpty(value)) {
        errors.push(`${key} must be required`);
      }
    }

    // 에러 존재
    if (errors.length > 0) {
      return {
        errors,
        values: {
          ...data,
        },
      };
    }

    // 백엔드로 데이터 제출 ( 최소 1초 이상 걸림 by code )
    await addOpinion({ ...data });
    return {
      errors: null,
    };
  }
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.values?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.values?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.values?.body}></textarea>
        </p>
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <SubmitButton />
      </form>
    </div>
  );
}
