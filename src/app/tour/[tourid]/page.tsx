"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Event from "../../../../components/Event";
import AddEvent from "../../../../components/AddEvent";
import TourLedger from "../../../../components/TourLedger";

type Params = {
  params: {
    tourid: string;
  };
};

const TourPage = ({ params: { tourid } }: Params) => {
  const [tourData, setTourData] = useState({
    id: "",
    created_at: "",
    updated_at: "",
    name: "",
    start_date: "",
    end_date: "",
    region: "",
    billing_type: "",
    other_bands: "",
    notes: "",
    events: [
      {
        id: "",
        name: "",
        venue: "",
        all_ages: false,
        billing_type: "",
        attendance: -1,
        notes: "",
        location: "",
        event_date: Date(),
      },
    ],
  });
  const [loading, setLoading] = useState(true);
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

  const getTourData = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("tourid", tourid);
    const url = `/api/tour/?${queryParams.toString()}`;
    //const url2 = `/api/tour/?tourid=${tourid}`;
    //const url3 = "/api/tour/?tourid=130e18e7-fb51-43eb-a145-3e2b2301899e";
    //console.log("URL " + url);
    //console.log("TOURID " + tourid);

    await fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTourData(data);
        setLoading(false);
        //console.log("data: " + JSON.stringify(data));
        ///console.log("tour data: " + tourData);
        //console.log("EVENTS " + tourData.events[0].name);
      });
  };

  useEffect(() => {
    getTourData();
    //console.log("EVENTS " + tourData.events[0].name);
  }, []);

  const getEventData = (eventId: string) => {
    for (let i = 0; i < tourData.events.length; i++) {
      if (tourData.events[i].id === eventId) {
        setEventData(tourData.events[i]);
      }
    }
  };

  const openEvent = (eventId: string) => {
    getEventData(eventId);
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
      <div className="tour-page">
        {loading ? (
          "loading..."
        ) : (
          <div>
            <h1>{tourData.name}</h1>
            <h2>Region: {tourData.region}</h2>
            <h2>Billing: {tourData.billing_type}</h2>
            <h3>
              Dates:
              {formatDateString(tourData.start_date)} to{" "}
              {formatDateString(tourData.end_date)}
            </h3>
            <h3>Bands: {tourData.other_bands}</h3>
            <h3>Notes: {tourData.notes}</h3>
          </div>
        )}
      </div>
      <div>
        <button onClick={() => setAddEventOpen(true)}>Add New Event</button>
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
      <div>
        <h2>Shows</h2>
        {/*<Event {...tourData.events[0]} /> */}
        <ul>
          {tourData.events.map((opt) => (
            <li
              className="clickable"
              onClick={(key) => openEvent(opt.id)}
              key={opt.id}
            >
              {opt.name}
            </li>
          ))}
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
        <TourLedger tourid={tourid} />
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
