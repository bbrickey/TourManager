"use client";
import React, { useState, useEffect } from "react";
import ReportToolChart from "./ReportToolChart";

const ReportTool = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [rerenderKey, setRerenderKey] = useState(0);
  const [categoryData, setCategoryData] = useState([
    {
      _sum: { value: 0 },
      category: "",
    },
  ]);
  const [reportData, setReportData] = useState([
    {
      _sum: { value: 0 },
      account_type: "",
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

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Start Date changed:", e.target.value);
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("End Date changed:", e.target.value);
    setEndDate(e.target.value);
  };

  const isStartDateAfterEndDate = new Date(startDate) > new Date(endDate);

  const onSubmit = async () => {
    if (isStartDateAfterEndDate) {
      return;
    }
    const reportUrl = `/api/report-tool-summary/?start=${startDate}end=${endDate}`;
    const categoryUrl = `/api/report-tool-category/?start=${startDate}end=${endDate}`;

    await fetch(reportUrl, {
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

    await fetch(categoryUrl, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategoryData(data);
        //console.log("data: " + JSON.stringify(data));
        console.log("report data: " + categoryData);
        const keyForRerender = new Date().getTime();
        setRerenderKey(keyForRerender);
        setLoading(false);
      });
  };

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
    <div className="report-tool">
      <h1>Financial Summary</h1>
      <h2>Select date range to view summary</h2>
      <div>
        <div className="report-tool-datepicker">
          <label>Start Date</label>
          <input type="date" onChange={handleStartDateChange}></input>

          <label>End Date</label>
          <input type="date" onChange={handleEndDateChange}></input>
          {isStartDateAfterEndDate && (
            <p className="error">Start Date is After End Date</p>
          )}
          <>
            {isStartDateAfterEndDate && (
              <p className="error">Please fix the errors before submitting.</p>
            )}
            <button
              className="font-roboto bg-custom text-white py-2 px-2 my-2 mx-2 rounded-md"
              type="submit"
              onClick={onSubmit}
            >
              Submit
            </button>
          </>
        </div>

        <div>
          {loading ? (
            ""
          ) : (
            <div>
              <div>{displayReportData()}</div>
              <div className="report-chart">
                <ReportToolChart key={rerenderKey} data={categoryData} />
                <div className="report-chart-items">
                  {categoryData.map((opt, index) => (
                    <p key={index}>
                      {mapCategoryToText(opt.category)}: ${opt._sum.value}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportTool;
