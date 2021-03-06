import React, { useState } from "react";
import { login } from "../../services/auth.js";
import "./Signup";
import * as CONSTS from "../../utils/consts";
import * as PATHS from "../../utils/paths";

export default function LogIn({ authenticate, history }) {
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const { usernameOrEmail, password } = form;
  const [error, setError] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();

    const credentials = {
      usernameOrEmail,
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({
          message: "Wrong credentials. Please try once again.",
        });
      }
      localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
      authenticate(res.data.user);
      history.push(PATHS.HOMEPAGE);
    });
  }

  return (
    <div className="auth-wrapper">
      <h1>Log in</h1>
      <form onSubmit={handleFormSubmission} className="auth__form">
        <label htmlFor="input-usernameOrEmail">Username or email</label>
        <input
          id="input-usernameOrEmail"
          type="text"
          name="usernameOrEmail"
          placeholder="Username or email"
          value={usernameOrEmail}
          onChange={handleInputChange}
          required
          className="input-field auth-input"
        />

        <label htmlFor="input-password">Password</label>
        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          required
          minLength="8"
          className="input-field auth-input"
        />

        {error && (
          <div className="error-block">
            <p>{error.message}</p>
          </div>
        )}

        <button className="auth-btn sandybrown" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}
