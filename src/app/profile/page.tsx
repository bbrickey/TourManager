import React from "react";
import Link from "next/link";
import NavBar from "../../../components/NavBar";
import UpdatePassword from "../../../components/UpdatePassword";
import Profile from "../../../components/Profile";

const reports = () => {
  return (
    <div>
      <NavBar />
      <div className="main-body">
        <Profile />
        <UpdatePassword />
      </div>
    </div>
  );
};

export default reports;
