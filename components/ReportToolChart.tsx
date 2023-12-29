"use client";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type ReportData = {
  _sum: { value: number };
  category: string;
}[];

interface ReportProps {
  data: ReportData;
}

type ChartData = {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }
  ];
};

const INITIAL_DATA: ChartData = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const ReportToolChart = ({ data }: ReportProps) => {
  const [chartData, setChartData] = useState(INITIAL_DATA);
  const [noData, setNoData] = useState(true);

  useEffect(() => {
    getChartData();
  }, []);

  const getChartData = () => {
    console.log("TEST" + data);
    if (data.length === 0) {
      setNoData(true);
      return;
    } else {
      setNoData(false);
    }
    let newLabels = [];
    let newValues = [];

    for (let i = 0; i < data.length; i++) {
      newLabels.push(data[i].category);
      newValues.push(data[i]._sum.value);
    }

    let newChartData: ChartData = {
      labels: newLabels,
      datasets: [
        {
          label: "",
          data: newValues,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setChartData(newChartData);
  };

  return (
    <div>
      {noData ? (
        "No data available in date range"
      ) : (
        <div>
          <Doughnut data={chartData} />
        </div>
      )}
    </div>
  );
};

export default ReportToolChart;
