"use client";
import React, { useState, useEffect } from "react";

interface TourLedgerProps {
  tourid: string;
}

const TourLedger = ({ tourid }: TourLedgerProps) => {
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
  const getLedgerData = async () => {
    //console.log("Trying");
    const queryParams = new URLSearchParams();
    queryParams.append("tourid", tourid);
    const url = `/api/tourledger/?${queryParams.toString()}`;

    await fetch(url, {
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
    //console.log("TOUR ID " + tourid);
    getLedgerData();
    //console.log(ledgerData);
  }, []);
  return (
    <div>
      <h1>Ledger</h1>
      <div className="ledger-list">
        <div className="ledger-item">
          <h3>Account Type</h3>
          {ledgerData.map((entry) => (
            <div>
              <p key={entry.account_type}>{entry.account_type}</p>
            </div>
          ))}
        </div>
        <div className="ledger-item">
          <h3>Category</h3>
          {ledgerData.map((entry) => (
            <div>
              <p key={entry.category}>{entry.category}</p>
            </div>
          ))}
        </div>
        <div className="ledger-item">
          <h3>Subcategory</h3>
          {ledgerData.map((entry) => (
            <div>
              <p key={entry.subcategory}>{entry.subcategory}</p>
            </div>
          ))}
        </div>
        <div className="ledger-item">
          <h3>Value</h3>
          {ledgerData.map((entry) => (
            <div>
              <p key={entry.value}>{entry.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourLedger;
