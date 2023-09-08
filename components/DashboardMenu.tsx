"use client";

import React from "react";
import Link from "next/link";
import UpdatePassword from "./UpdatePassword";

export const DashboardMenu = () => {
  return (
    <div>
      <h2 className="text-center mb-4">Menu</h2>
      <div className="w = 100 text-center mt-2">
        <Link href="/add-income">Add Income & Expenses </Link>
      </div>
      <div className="w = 100 text-center mt-2">
        <Link href="/tours-and-events">Add Tours & Events </Link>
      </div>
      <div className="w = 100 text-center mt-2">
        <Link href="/reports">View Reports </Link>
      </div>

      <UpdatePassword />
      {/* 
        <div className="w = 100 text-center mt-2">
          <Link href="/update-profile">Update Username & Password </Link>
        </div>
        */}
    </div>
  );
};
