import React from "react";
import Ledger from "../../../components/Ledger";
import Link from "next/link";
import NavBar from "../../../components/NavBar";
import ReportTool from "../../../components/ReportTool";

const reports = () => {
  return (
    <div>
      <NavBar />
      <ReportTool />
      <Ledger />
    </div>
  );
};

export default reports;
