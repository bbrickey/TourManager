"use client";
import React, { useState, useEffect } from "react";

type Ledger = {
  id: string;
  account_type: string;
  category: string;
  subcategory: string;
  value: number;
  event_id: string;
  notes: string;
  tour_id: string;
};

const Ledger = () => {
  const [ledgerData, setLedgerData] = useState([
    {
      id: "",
      account_type: "",
      category: "",
      subcategory: "",
      value: 0,
      event_id: "",
      notes: "",
      tour_id: "",
    },
  ]);

  const getLedger = async () => {
    //console.log("Trying");
    await fetch("/api/ledger", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLedgerData(data);
        //console.log("event data: " + JSON.stringify(data));
      });
  };

  useEffect(() => {
    getLedger();
  }, []);

  return (
    <div className="ledger-list">
      <div className="ledger-item">
        <h2>Account Type</h2>
        {ledgerData.map((entry) => (
          <p key={entry.account_type}>{entry.account_type}</p>
        ))}
      </div>
      <div className="ledger-item">
        <h2>Category</h2>
        {ledgerData.map((entry) => (
          <p key={entry.category}>{entry.category}</p>
        ))}
      </div>
      <div className="ledger-item">
        <h2>Subcategory</h2>
        {ledgerData.map((entry) => (
          <p key={entry.subcategory}>{entry.subcategory}</p>
        ))}
      </div>
      <div className="ledger-item">
        <h2>Value</h2>
        {ledgerData.map((entry) => (
          <p key={entry.value}>{entry.value}</p>
        ))}
      </div>
    </div>
  );
};

export default Ledger;
