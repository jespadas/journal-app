import React from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegistrerScreen = () => {
  const dispatch = useDispatch();

  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "Julio",
    email: "jejeeeee@gmail.com",
    password: "123456",
    confirmPass: "123456",
  });

  const { name, email, password, confirmPass } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if ( isFormValid() );
    dispatch( startRegisterWithEmailPasswordName(email,password,name) );
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password !== confirmPass || password.length < 5) {
      dispatch(
        setError(
          "Password should be at least 6 characters and should match each other"
        )
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h1 className="auth__title">Register</h1>

      <form onSubmit={handleRegister}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
          value={name}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          onChange={handleInputChange}
          value={email}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          onChange={handleInputChange}
          autoComplete="off"
          value={password}
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPass"
          className="auth__input"
          onChange={handleInputChange}
          autoComplete="off"
          value={confirmPass}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered ?
        </Link>
      </form>
    </>
  );
};
