import React, { useState } from "react";
import { signup } from "../../services/auth.js";
import "./auth.css";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

export default function Signup({ authenticate, history }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = form;
  const [error, setError] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      email,
      password,
    };
    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: res.errorMessage,
        });
      }
      // successful signup
      localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
      authenticate(res.data.user);
      history.push(PATHS.HOMEPAGE);
    });
  }

  return (
    <div className="auth-wrapper">
      <h1>Sign up</h1>
      <form onSubmit={handleFormSubmission} className="auth__form">
        <label htmlFor="input-username">Username</label>
        <input
          id="input-username"
          type="text"
          name="username"
          placeholder="Your username"
          value={username}
          onChange={handleInputChange}
          required
          className="input-field auth-input"
        />

        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="email"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={handleInputChange}
          required
          className="input-field auth-input"
        />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="Your password (min. 8 characters)"
          value={password}
          onChange={handleInputChange}
          required
          minLength="8"
          className="input-field auth-input"
        />

        {error && (
          <div className="error-block">
            <p>Ooooops!</p>
            <p>{error.message}</p>
          </div>
        )}

        <button className="auth-btn sandybrown" type="submit">
          Create account
        </button>
      </form>
    </div>
  );
}
