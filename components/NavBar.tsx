"use client";
import Link from "next/link";
import React from "react";
import SignOut from "./SignOut";
import { getServerSession } from "next-auth";
import { Options } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

const NavBar = () => {
  //const session = await getServerSession(Options);
  const session = useSession();
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
            Reports
          </Link>
        </li>
        <li>
          <Link className="link" href="/profile">
            User Profile
          </Link>
        </li>

        {session?.status === "authenticated" ? (
          <li>
            <SignOut />
          </li>
        ) : (
          <li>
            <Link className="link" href="/">
              Sign In
            </Link>
          </li>
        )}

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
