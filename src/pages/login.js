import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { authService } from "fbase";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await authService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("로그인 성공");
        history.push("/admin");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value="로그인" />
        {error && <span className="authError">{error}</span>}
      </form>
    </>
  );
};
export default Login;
