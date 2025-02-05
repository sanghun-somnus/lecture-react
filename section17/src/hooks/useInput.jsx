import { useState } from "react";

export function useInput(deafultValue, validationFn) {
  const [entered, setEntered] = useState({
    value: deafultValue,
    didEdit: false,
  });
  const isValid = validationFn(entered.value);

  function handleChange(e) {
    setEntered({
      value: e.target.value,
      didEdit: false,
    });
  }

  function handleBlur(e) {
    setEntered((prev) => ({
      ...prev,
      didEdit: true,
    }));
  }

  return {
    entered,
    hasError: entered.didEdit && !isValid,
    handleChange,
    handleBlur,
  };
}
