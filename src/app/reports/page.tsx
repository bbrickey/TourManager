import React from "react";
import Ledger from "../../../components/Ledger";
import Link from "next/link";
import NavBar from "../../../components/NavBar";

const reports = () => {
  return (
    <div>
      <NavBar />
      <h1>Reports</h1>
      <Ledger />
    </div>
  );
};

export default reports;
