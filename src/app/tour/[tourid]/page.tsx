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

type Event = {
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
    console.log(date);
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

  const displayEvent = (opt: Event) => {
    const dateString = formatDateString(opt.event_date);
    return (
      <li
        className="clickable"
        onClick={(key) => openEvent(opt.id)}
        key={opt.id}
      >
        {opt.name} {dateString}
      </li>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="tour-page">
        {loading ? (
          "loading..."
        ) : (
          <div>
            <h1>{tourData.name}</h1>
            <div className="tour-data">
              <div>
                <h2>Region: {tourData.region}</h2>
                <h2>Billing: {tourData.billing_type}</h2>
                <h2>
                  Dates: {formatDateString(tourData.start_date)} to{" "}
                  {formatDateString(tourData.end_date)}
                </h2>
              </div>
              <div>
                <h2>
                  Bands: {tourData.other_bands ? tourData.other_bands : "n/a"}
                </h2>
                <h2>Notes: {tourData.notes ? tourData.notes : "n/a"}</h2>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="tour-page">
        <div></div>
        <h1>Shows</h1>
        {/*<Event {...tourData.events[0]} /> */}
        {loading ? (
          "No Events"
        ) : (
          <ul>{tourData.events.map((opt) => displayEvent(opt))}</ul>
        )}
        {eventModalOpen && (
          <div>
            <Event
              data={eventData}
              open={eventModalOpen}
              onClose={() => setEventModalOpen(!eventModalOpen)}
            />
          </div>
        )}
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
      </div>

      <TourLedger tourid={tourid} />

      <div>
        <Link href="/tours-and-events">Back to Tours & Events </Link>
      </div>
    </div>
  );
};

export default TourPage;
