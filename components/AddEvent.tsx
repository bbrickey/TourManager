"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useSession } from "next-auth/react";

interface AddEventProps {
  open: boolean;
  onClose: () => void;
  tourid?: string;
}
type FormData = {
  name: string;
  tour: string;
  date: string;
  city_state: string;
  venue: string;
  billing_type: string;
  all_ages: boolean;
  bands: string;
  attendance: number;
  notes: string;
};

const INITIAL_DATA: FormData = {
  name: "",
  tour: "",
  date: "",
  city_state: "",
  venue: "",
  billing_type: "",
  all_ages: false,
  bands: "",
  attendance: -1,
  notes: "",
};

const AddEvent = ({ open, onClose, tourid }: AddEventProps) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [name, setName] = useState("");
  const [tour, setTour] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [venue, setVenue] = useState("");
  const [billingType, setBillingType] = useState("");
  const [allAges, setAllAges] = useState(false);
  const [bands, setBands] = useState("");
  const [attendance, setAttendance] = useState(-1);
  const [notes, setNotes] = useState("");
  const [tourData, setTourData] = useState([{ id: "", name: "" }]);
  const [isOpen, setIsOpen] = useState("false");
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const session = useSession();

  const typeCategories = [
    { value: "Headline", text: "Headline" },
    { value: "Support", text: "Support" },
    { value: "Festival", text: "Festival" },
    { value: "Other", text: "Other" },
  ];

  const getTour = async () => {
    await fetch("/api/tours", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //console.log(data[0]);
        setTourData(data);
        //console.log("tour data: " + tourData);
      });
  };

  useEffect(() => {
    getTour();
  }, []);

  useEffect(() => {
    if (tourid) {
      setTour(tourid);
    }
  }, [tourid]);

  const onSubmit = async (e: FormEvent) => {
    data.name = name;
    data.tour = tour;
    data.date = date;
    data.city_state = location;
    data.venue = venue;
    data.billing_type = billingType;
    data.all_ages = allAges;
    data.bands = bands;
    data.attendance = attendance;
    data.notes = notes;

    e.preventDefault();
    // console.log("Form Submitted", data);
    //console.log(JSON.stringify(data));

    if (session?.status === "authenticated") {
      try {
        const response = await fetch("/api/event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        });

        const result = await response.json();

        setSubmitModalOpen(true);
        //reset form
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      alert("You must be logged in to submit");
    }
  };

  const checkBox = () => {
    setAllAges(!allAges);
    //console.log(allAges);
  };

  if (!open) return null;

  const getTourName = () => {
    for (let i = 0; i < tourData.length; i++) {
      if (tourData[i].id == tourid) return tourData[i].name;
    }
  };

  const renderTourOption = () => {
    if (tourid) {
      return (
        <select className="bg-custom_form rounded-md" defaultValue={tourid}>
          <option value={tourid}>{getTourName()}</option>
        </select>
      );
    } else {
      return (
        <select
          className="bg-custom_form rounded-md"
          onChange={(e) => setTour(e.target.value)}
        >
          <option value="">None</option>
          {tourData.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      );
    }
  };

  return (
    <div className="modal">
      <div className="tour-form">
        <h1>Add New Event</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label>Event Name:</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div>
            <label>Tour:</label>
            {renderTourOption()}
          </div>
          <div>
            <label>Start Date</label>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Venue:</label>
            <input
              type="text"
              onChange={(e) => setVenue(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Billing Type:</label>
            <select
              className="bg-custom_form rounded-md"
              defaultValue=""
              onChange={(e) => setBillingType(e.target.value)}
            >
              <option value="" hidden disabled></option>
              {typeCategories.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>21+</label>
            <input
              type="checkbox"
              defaultChecked
              onChange={() => checkBox()}
            ></input>
          </div>
          <div>
            <label>Other Bands:</label>
            <textarea
              className="bg-custom_form rounded-md"
              onChange={(e) => setBands(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>Attendance:</label>
            <input
              type="number"
              min="0"
              onChange={(e) => setAttendance(parseInt(e.target.value, 10))}
            ></input>
          </div>
          <div>
            <label>Notes:</label>
            <textarea
              className="bg-custom_form rounded-md"
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <button
            className="font-roboto bg-custom text-white py-2 px-2 my-2 mx-2 rounded-md"
            type="submit"
          >
            Submit
          </button>
          <button
            className="font-roboto bg-custom text-white py-2 px-2 my-2 mx-2 rounded-md"
            onClick={() => onClose()}
          >
            Close
          </button>
          {submitModalOpen && (
            <div className="submit-modal">
              <h1>Submission Successful!</h1>
              <button
                className="font-roboto bg-custom text-white py-2 px-2 my-2 mx-2 rounded-md"
                onClick={() => {
                  onClose();
                  setSubmitModalOpen(false);
                }}
              >
                Close
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
