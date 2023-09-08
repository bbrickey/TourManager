"use client";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(INITIAL_DATA);

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    console.log("SUBMITTING");
    signIn("credentials", { ...data, callbackUrl: "/add-income" });
  };

  return (
    <div className="login-container">
      <h1>Sign In To Your Account</h1>
      <div className="login-form">
        <form onSubmit={loginUser}>
          <div className="login-item">
            <label>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              required
              onChange={(e) => setData({ ...data, email: e.target.value })}
            ></input>
          </div>
          <div className="login-item">
            <label>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={data.password}
              required
              onChange={(e) => setData({ ...data, password: e.target.value })}
            ></input>
          </div>
          {/*
          <div className="login-item">
            <a href="#">Forgot Password?</a>
          </div>
        */}
          <div className="demo-link">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
