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
  created_at: string;
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
      created_at: "",
    },
  ]);

  const getLedger = async () => {
    //console.log("Trying");
    try {
      const response = await fetch("/api/ledger", {
        method: "GET",
      });
      if (!response.ok) {
        // Handle non-successful HTTP responses (e.g., 404, 500, etc.)
        throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      setLedgerData(data);
      //console.log("event data: " + JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching ledger data:", error);
    }
  };

  useEffect(() => {
    getLedger();
  }, []);

  return (
    <div className="ledger-list">
      <div className="ledger-item">
        <h2>Account Type</h2>
        {ledgerData.map((entry) => (
          <p key={entry.id}>{entry.account_type}</p>
        ))}
      </div>
      <div className="ledger-item">
        <h2>Category</h2>
        {ledgerData.map((entry) => (
          <p key={entry.id}>{entry.category}</p>
        ))}
      </div>
      <div className="ledger-item">
        <h2>Subcategory</h2>
        {ledgerData.map((entry) => (
          <p key={entry.id}>{entry.subcategory}</p>
        ))}
      </div>
      <div className="ledger-item">
        <h2>Value</h2>
        {ledgerData.map((entry) => (
          <p key={entry.id}>{entry.value}</p>
        ))}
      </div>
      <div className="ledger-item">
        <h2>Date Created</h2>
        {ledgerData.map((entry) => (
          <p key={entry.id}>{entry.created_at}</p>
        ))}
      </div>
    </div>
  );
};

export default Ledger;
