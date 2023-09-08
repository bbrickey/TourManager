"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Profile = () => {
  const session = useSession();
  console.log(session.data?.user);
  return (
    <div className="profile-data">
      <h1>User Profile</h1>
      {session?.status === "authenticated" ? (
        <div>
          <h2>Name: {session.data.user?.name}</h2>
          <h2>Email: {session.data.user?.email}</h2>
        </div>
      ) : (
        <h2>Sign In for User Profile Data</h2>
      )}
    </div>
  );
};

export default Profile;
