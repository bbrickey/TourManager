import React from "react";
import Ledger from "../../../components/Ledger";
import Link from "next/link";

const reports = () => {
  return (
    <div>
      <h1>Reports</h1>
      <Ledger />
      <Link href="/">Back to Dashboard </Link>
    </div>
  );
};

export default reports;
