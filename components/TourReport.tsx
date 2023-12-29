"use client";
import React, { useState, useEffect } from "react";

type TourLedgerProps = {
  tourid: string;
};

const TourReport = ({ tourid }: TourLedgerProps) => {
  const [reportData, setReportData] = useState([
    {
      _sum: { value: 0 },
      account_type: "",
    },
  ]);

  const [reportCategoryData, setReportCategoryData] = useState([
    {
      _sum: { value: 0 },
      category: "",
    },
  ]);

  const reportCategories = [
    { value: "tour_expense", text: "Tour Expenses" },
    { value: "general_expense", text: "General Band Expenses" },
    { value: "recording_expense", text: "Recording Expenses" },
    { value: "merch_expense", text: "Merch Expenses" },
    { value: "marketing_expense", text: "Marketing Expenses" },
    { value: "merch_income", text: "Merch Income" },
    { value: "tour_income", text: "Tour Income" },
    { value: "other_income", text: "Other Income" },
    { value: "liability", text: "Liabilities" },
  ];

  const getReportData = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("tourid", tourid);
    //console.log(queryParams.toString());
    const url = `/api/tour-report-accounttype/?${queryParams.toString()}`;
    await fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReportData(data);
        //console.log("data: " + JSON.stringify(data));
        //console.log("report data: " + reportData);
      });
  };

  const getReportCategoryData = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("tourid", tourid);
    const url = `/api/tour-report-category/?${queryParams.toString()}`;
    await fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReportCategoryData(data);
        //console.log("data: " + JSON.stringify(data));
        //console.log("report data: " + reportCategoryData);
      });
  };

  useEffect(() => {
    getReportData();
    getReportCategoryData();
  }, []);

  const displayReportData = () => {
    let expense = 0,
      income = 0;
    for (let i = 0; i < reportData.length; i++) {
      if (reportData[i].account_type == "expense") {
        expense = reportData[i]._sum.value;
      }
      if (reportData[i].account_type == "income") {
        income = reportData[i]._sum.value;
      }
    }
    return (
      <div className="tour-report">
        <p key="net">Net: ${income - expense}</p>
        <p key="income">Income: ${income}</p>
        <p key="expense">Expenses: ${expense}</p>
      </div>
    );
  };

  const mapCategoryToText = (category: string) => {
    const matchingCategory = reportCategories.find(
      (item) => item.value === category
    );
    return matchingCategory ? matchingCategory.text : category;
  };

  return (
    <div className="tour-page">
      <h1>Reports</h1>
      <div>{displayReportData()}</div>
      <div className="tour-report__breakdown">
        <h2>Breakdown:</h2>
        {reportCategoryData.map((opt, index) => (
          <p key={index}>
            {mapCategoryToText(opt.category)}: ${opt._sum.value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TourReport;
