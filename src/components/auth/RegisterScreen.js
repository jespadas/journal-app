import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

export const RegistrerScreen = () => {
  /* 
    {
      name: 'Julio',
      email: 'lanonymatestundroit@gmail.com',
      password: '123456',
      confirm-pass: '123456'
    }
  */

  /* 
    useForm

    const handleRegister = (e) => {
      console.log(name, email, password, confirm-pass)
    }
  */
  const [ formValues, handleInputChange ] = useForm( {
      name: 'Julio',
      email: 'lanonymatestundroit@gmail.com',
      password: '123456',
      confirmPass: '123456'
    } );

  const { name, email, password, confirmPass} = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    
  }

  const isFormValid = () => {
    
  }

  return (
    <>
      <h1 className="auth__title">Register</h1>

      <form onSubmit={handleRegister}>
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
