"use client";
import { useState, useEffect, FormEvent } from "react";
import { useSession } from "next-auth/react";

type FormData = {
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  email: "",
  password: "",
};

const UpdatePassword = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const session = useSession();

  useEffect(() => {
    if (confirmPassword !== data.password) {
      setError(true);
    } else {
      setError(false);
    }
  }),
    [confirmPassword];

  const changePassword = async (e: FormEvent) => {
    e.preventDefault();
    console.log(data);

    if (error) {
      return;
    }

    if (session?.status === "authenticated") {
      try {
        const response = await fetch("/api/updatepassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });

        const result = await response.json();
        console.log("response " + result);
        setSubmitModalOpen(true);

        //reset form
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      alert("You must be logged in to submit");
    }
  };

  return (
    <div className="login-container">
      <h2>Update Password</h2>
      <div className="login-form">
        <form onSubmit={changePassword}>
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
            <label>New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={data.password}
              required
              onChange={(e) => setData({ ...data, password: e.target.value })}
            ></input>
          </div>
          <div className="login-item">
            <label>Confirm New Password </label>
            <input
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            {error && <p className="error">Passwords must match</p>}
          </div>
          <div className="login-item">
            <button className="demo-link" type="submit">
              Submit
            </button>
          </div>
          {submitModalOpen && (
            <div className="submit-modal">
              <h1>Submission Successful!</h1>
              <button
                className="font-roboto bg-custom text-white py-4 px-6 my-4 mx-4 rounded-md"
                onClick={() => {
                  setSubmitModalOpen(false);
                }}
              >
                Close
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
