"use client";
import React, { useEffect } from "react";
import { useState } from "react";

//OPTIONS

//pass event data via props
/////makes sense from tour page

//call event data from eventid, pass eventid only
//double call from tour page
//might allow component to be more re-usable

type EventData = {
  id: string;
  name: string;
  venue: string;
  all_ages: boolean;
  billing_type: string;
  attendance: number;
  notes: string;
  location: string;
  event_date: string;
};

interface EventProps {
  open: boolean;
  onClose: () => void;
  data: EventData;
}

const Event = ({ open, onClose, data }: EventProps) => {
  const [loading, setLoading] = useState(true);

  const formatDateString = (date: string) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let splitstring = date.split("-");
    let year = splitstring[0];
    let month = months[parseInt(splitstring[1]) - 1];
    let splitstring2 = splitstring[2].split("T");
    let day = splitstring2[0];
    return month + " " + day + " " + year;
  };

  useEffect(() => {
    setEventData(data);
    setLoading(false);
  }, [data]);

  const [eventData, setEventData] = useState({
    name: "",
    id: "",
    venue: "",
    all_ages: false,
    billing_type: "",
    attendance: -1,
    notes: "",
    location: "",
    event_date: "",
  });

  if (!open) return null;

  return (
    <div className="modal">
      <div className="event-page">
        {loading ? (
          "loading"
        ) : (
          <div>
            <h1>{eventData.name}</h1>
            <h3>Venue: {eventData.venue}</h3>
            <h3>Location: {eventData.location}</h3>
            <h3>Date: {formatDateString(eventData.event_date)}</h3>
            <h3>Billing: {eventData.billing_type}</h3>
            <h3>All Ages: {eventData.all_ages ? "Yes" : "No"}</h3>
            <h3>Attendance: {eventData.attendance}</h3>
            <h3>Notes: {eventData.notes}</h3>
          </div>
        )}
        <button onClick={() => onClose()}>Close</button>
      </div>
    </div>
  );
};

export default Event;
