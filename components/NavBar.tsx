import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="navbar">
      <h2>Dead Bars Tour Manager</h2>
      <ul>
        <li>
          <Link className="link" href="/add-income">
            Update Ledger
          </Link>
        </li>
        <li>
          <Link className="link" href="/tours-and-events">
            Tours & Events
          </Link>
        </li>
        <li>
          <Link className="link" href="/reports">
            View Reports
          </Link>
        </li>
        {/*
        <li>
        <Link href="/update-profile">Update Username & Password </Link>
        </li>
        */}
      </ul>
    </div>
  );
};

export default NavBar;
