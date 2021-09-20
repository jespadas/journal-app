import { useState } from "react";

export const useForm = (initialState = {}) => {
  // Initial state passed
  const [values, setValues] = useState(initialState);

  // Function to uptade values in state
  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const reset = () => {
    setValues(initialState);
  };

  return [values, handleInputChange, reset];
};
