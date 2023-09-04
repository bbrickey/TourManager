"use client";

import React, { useState, FormEvent, useEffect } from "react";

interface AddTourProps {
  open: boolean;
  onClose: () => void;
}
type FormData = {
  name: string;
  billing_type: string;
  start_date: string;
  end_date: string;
  bands: string;
  region: string;
  notes: string;
};

const INITIAL_DATA: FormData = {
  name: "",
  billing_type: "",
  start_date: "",
  end_date: "",
  bands: "",
  region: "",
  notes: "",
};

const AddTour = ({ open, onClose }: AddTourProps) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [name, setName] = useState("");
  const [billingType, setBillingType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bands, setBands] = useState("");
  const [region, setRegion] = useState("");
  const [notes, setNotes] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  const typeCategories = [
    { value: "Headline", text: "Headline" },
    { value: "Support", text: "Support" },
    { value: "Festival", text: "Festival" },
    { value: "Other", text: "Other" },
  ];

  const regionCategories = [
    { value: "West Coast", text: "West Coast" },
    { value: "East Coast", text: "East Coast" },
    { value: "South", text: "South" },
    { value: "Midwest", text: "Midwest" },
    { value: "PNW", text: "PNW" },
    { value: "Canada", text: "Canada" },
    { value: "Europe", text: "Europe" },
    { value: "Asia", text: "Asia" },
    { value: "Other", text: "Other" },
  ];

  const onSubmit = async (e: FormEvent) => {
    data.bands = bands;
    data.name = name;
    data.billing_type = billingType;
    data.start_date = startDate;
    data.end_date = endDate;
    data.region = region;
    data.notes = notes;
    e.preventDefault();
    //console.log("Form Submitted", data);
    //console.log(JSON.stringify(data));

    if (isStartDateAfterEndDate) {
      return;
    }

    try {
      //console.log("TEST");
      const response = await fetch("/api/tour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const result = await response.json();
      console.log("server response: " + result); // Handle the response from the server

      setFormSubmitted(true);
      setSubmitModalOpen(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!open) return null;

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log("Start Date changed:", e.target.value);
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log("End Date changed:", e.target.value);
    setEndDate(e.target.value);
  };

  const isStartDateAfterEndDate = new Date(startDate) > new Date(endDate);

  return (
    <div className="modal">
      <div className="tour-form">
        <h1>Add New Tour</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label>Tour Name:</label>
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Type:</label>
            <select
              className="bg-custom_form rounded-md"
              defaultValue=""
              required
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
            <label>Region:</label>
            <select
              className="bg-custom_form rounded-md"
              defaultValue=""
              required
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="" hidden disabled></option>
              {regionCategories.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Start Date</label>
            <input type="date" onChange={handleStartDateChange}></input>
            <label>End Date</label>
            <input type="date" onChange={handleEndDateChange}></input>

            {isStartDateAfterEndDate && (
              <p className="error">Start Date is After End Date</p>
            )}
          </div>
          <div>
            <label>Other Bands:</label>
            <textarea
              className="bg-custom_form rounded-md"
              onChange={(e) => setBands(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>Notes:</label>
            <textarea
              className="bg-custom_form rounded-md"
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <>
            {isStartDateAfterEndDate && (
              <p className="error">Please fix the errors before submitting.</p>
            )}
            <button
              className="font-roboto bg-custom text-white py-2 px-2 my-2 mx-2 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </>

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
                className="font-roboto bg-custom text-white py-4 px-6 my-4 mx-4 rounded-md"
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

export default AddTour;
