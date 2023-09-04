"use client";
import React, { useState, useEffect } from "react";
import LedgerItem from "./LedgerItem";
import { DataTable } from "./LedgerTable";
import { columns } from "./LedgerColumns";

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
  /*
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
  */
  const [ledgerData, setLedgerData] = useState<Ledger[]>([]);
  /*
  const [updatedLedgerData, setUpdatedLedgerData] = useState([
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
  */

  const [tourData, setTourData] = useState([{ id: "", name: "" }]);
  const [eventData, setEventData] = useState([
    { id: "", name: "", tour_id: "" },
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

  const getTours = async () => {
    try {
      const response = await fetch("/api/tours", { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      setTourData(data);
    } catch (error) {
      console.error("Error fetching tour data:", error);
    }
  };

  const getEvents = async () => {
    try {
      const response = await fetch("/api/event", { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      setEventData(data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  useEffect(() => {
    getLedger();
    getTours();
    getEvents();
  }, []);

  const getTourName = (id: String) => {
    for (let i = 0; i < tourData.length; i++) {
      if (tourData[i].id === id) {
        return tourData[i].name;
      }
    }
  };

  const getEventName = (id: String) => {
    for (let i = 0; i < eventData.length; i++) {
      if (eventData[i].id === id) {
        return eventData[i].name;
      }
    }
  };

  const updatedLedgerData: Ledger[] = ledgerData.map((item) => ({
    ...item,
    tour_id: getTourName(item.tour_id) || "na",
    event_id: getEventName(item.event_id) || "na",
    created_at: item.created_at.split("T")[0],
  }));

  const getDateString = (date: String) => {
    return date.split("T")[0];
  };

  console.log("Ledger Data:", ledgerData);

  return (
    <div className="ledger-container">
      <DataTable columns={columns} data={updatedLedgerData} />
    </div>
    /*
    <div className="ledger-list">
      <div className="ledger-item">
        <h2>Ledger Type</h2>
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
          <p key={entry.id}>{getDateString(entry.created_at)}</p>
        ))}
      </div>
      <div className="ledger-item">
        <h2>Tour</h2>
        {ledgerData.map((entry) => (
          <p key={entry.id}>
            {entry.event_id ? getTourName(entry.tour_id) : "n/a"}
          </p>
        ))}
      </div>
      <div className="ledger-item">
        <h2>Event</h2>
        {ledgerData.map((entry) => (
          <p key={entry.id}>
            {entry.event_id ? getEventName(entry.event_id) : "n/a"}
          </p>
        ))}
      </div>
       </div>
      */

    //shoudl ledger items be their own component? or just render here?
    /*
    <div className="ledger-list">
      <div className="ledger-header">
        <h2>Ledger Type</h2>
        <h2>Category</h2>
        <h2>SubCategory</h2>
      </div>
        {ledgerData.map((entry) => (
          <LedgerItem
            key={entry.id}
            account_type={entry.account_type}
            category={entry.category}
          />
        ))}
    </div>
    */
    /*
    <div className="ledger-list">
      <div className="ledger-header">
        <h2>Ledger Type</h2>
        <h2>Category</h2>
        <h2>SubCategory</h2>
        <h2>Value</h2>
        <h2>Date Created</h2>
        <h2>Tour</h2>
        <h2>Event</h2>
      </div>
      {ledgerData.map((entry) => (
        <div className="ledger-item" key={entry.id}>
          <p>{entry.category}</p>
          <p>{entry.subcategory}</p>
          <p>{entry.value}</p>
          <p>{getDateString(entry.created_at)}</p>
          <p>{entry.category}</p>
          <p>{entry.event_id ? getTourName(entry.tour_id) : "n/a"}</p>
          <p>{entry.event_id ? getEventName(entry.event_id) : "n/a"}</p>
        </div>
      ))}
    </div>
    */
  );
};

export default Ledger;
