"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const TourList = () => {
  const [tourData, setTourData] = useState([{ name: "", id: "" }]);
  const [loading, setLoading] = useState(true);

  const getTours = async () => {
    await fetch("/api/tours", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTourData(data);
        //console.log("tour data: " + tourData);
      });
  };

  useEffect(() => {
    getTours();
    setLoading(false);
  }, []);

  return (
    <div>
      <h1>Tours</h1>
      <div className="tour-list">
        {loading ? (
          "Loading..."
        ) : (
          <ol>
            {tourData.map((tour) => (
              <li key={tour.id}>
                <Link href={`/tour/${tour.id}`}>{tour.name}</Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default TourList;
