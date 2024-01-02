"use client";
import React, { useState } from "react";
import AddTour from "./AddTour";
import AddEvent from "./AddEvent";

const TourDashboard = () => {
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  return (
    <div className="event-buttons" data-testid="tour-dashboard">
      <div>
        <button
          className="font-roboto bg-custom text-white py-4 px-6 my-4 mx-4 rounded-md"
          onClick={() => setTourModalOpen(true)}
          data-testid="tour-button"
        >
          Add New Tour
        </button>
        {tourModalOpen && (
          <div>
            <AddTour
              open={tourModalOpen}
              onClose={() => setTourModalOpen(!tourModalOpen)}
            />
          </div>
        )}
      </div>
      <div>
        <button
          className="font-roboto bg-custom text-white py-4 px-6 my-4 mx-4 rounded-md"
          onClick={() => setEventModalOpen(true)}
          data-testid="event-button"
        >
          Add New Event
        </button>
        {eventModalOpen && (
          <div>
            <AddEvent
              open={eventModalOpen}
              onClose={() => setEventModalOpen(!eventModalOpen)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TourDashboard;
