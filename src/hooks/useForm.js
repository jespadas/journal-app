import { useState } from "react";

export const useForm = (initialState = {}) => {
  // Initial state passed
  const [values, setValues] = useState(initialState);

  // Uptades the values in state from the target name
  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  // Reset the old value with the new one
  const reset = (newFormState = initialState) => {
    setValues(newFormState);
  };

  return [values, handleInputChange, reset];
};
