"use client";
import React, { useState } from "react";
import AddTour from "./AddTour";
import AddEvent from "./AddEvent";

const TourDashboard = () => {
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  return (
    <div className="event-buttons">
      <div>
        <button onClick={() => setTourModalOpen(true)}>Add New Tour</button>
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
        <button onClick={() => setEventModalOpen(true)}>Add New Event</button>
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
