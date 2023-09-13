"use client";
import React from "react";
import { useSession } from "next-auth/react";
import UpdatePassword from "./UpdatePassword";
import Link from "next/link";

const Profile = () => {
  const session = useSession();
  //console.log(session.data?.user);
  return (
    <div>
      {session?.status === "authenticated" ? (
        <div className="profile-data">
          <h1>User Profile</h1>
          <h2>Name: {session.data.user?.name}</h2>
          <h2>Email: {session.data.user?.email}</h2>
          <UpdatePassword />
        </div>
      ) : (
        <div>
          <Link href="/">Sign in to view and update Profile Data</Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
