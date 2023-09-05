"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Event from "../../../../components/Event";
import AddEvent from "../../../../components/AddEvent";
import TourLedger from "../../../../components/TourLedger";
import NavBar from "../../../../components/NavBar";

type Params = {
  params: {
    tourid: string;
  };
};

type Events = [
  {
    id: string;
    name: string;
    venue: string;
    all_ages: boolean;
    billing_type: string;
    attendance: number;
    notes: string;
    location: string;
    event_date: string;
  }
];

const TourPage = ({ params: { tourid } }: Params) => {
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([
    {
      id: "",
      name: "",
      venue: "",
      all_ages: false,
      billing_type: "",
      attendance: 0,
      notes: "",
      location: "",
      event_date: "",
    },
  ]);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);

  const [eventData, setEventData] = useState({
    id: "",
    name: "",
    venue: "",
    all_ages: false,
    billing_type: "",
    attendance: -1,
    notes: "",
    location: "",
    event_date: Date(),
  });

  const getAllEvents = async () => {
    await fetch("/api/nontourevents", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllEvents(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const openEvent = (eventId: string) => {
    for (let i = 0; i < allEvents.length; i++) {
      if (allEvents[i].id === eventId) {
        setEventData(allEvents[i]);
      }
    }

    setEventModalOpen(true);
  };

  const formatDateString = (date: string) => {
    if (date) {
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
    } else {
      return null;
    }
  };

  return (
    <div>
      <NavBar />
      <div className="event-buttons">
        <button
          className="font-roboto bg-custom text-white py-2 px-2 my-2 mx-2 rounded-md"
          onClick={() => setAddEventOpen(true)}
        >
          Add New Event
        </button>
        {addEventOpen && (
          <div>
            <AddEvent
              open={addEventOpen}
              tourid={tourid}
              onClose={() => setAddEventOpen(!addEventOpen)}
            />
          </div>
        )}
      </div>

      <div className="show-list">
        <h1>Shows</h1>
        <ul>
          {allEvents.length > 0 ? (
            allEvents.map((opt) => (
              <li
                className="clickable"
                onClick={(key) => openEvent(opt.id)}
                key={opt.id}
              >
                {opt.name}
              </li>
            ))
          ) : (
            <li>No events to display.</li>
          )}
        </ul>

        {eventModalOpen && (
          <div>
            <Event
              data={eventData}
              open={eventModalOpen}
              onClose={() => setEventModalOpen(!eventModalOpen)}
            />
          </div>
        )}
      </div>

      <div>
        <Link href="/tours-and-events">Back to Tours & Events </Link>
      </div>
      <div>
        <Link href="/">Back to Dashboard </Link>
      </div>
    </div>
  );
};

export default TourPage;
