"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import styles from "./workoutchart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WorkoutChart: React.FC = () => {
  const workoutData = [
    { month: "Jan", frequency: 12 },
    { month: "Feb", frequency: 15 },
    { month: "Mar", frequency: 10 },
    { month: "Apr", frequency: 14 },
    { month: "May", frequency: 8 },
    { month: "Jun", frequency: 16 },
    { month: "Jul", frequency: 13 },
  ];

  const chartData = {
    labels: workoutData.map((data) => data.month),
    datasets: [
      {
        label: "Workout Frequency",
        data: workoutData.map((data) => data.frequency),
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "white",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#000",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(0, 0, 0, 0.6)",
        },
      },
      y: {
        display: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "rgba(0, 0, 0, 0.6)",
        },
      },
    },
  };

  return (
    <Card className={styles.chartCard}>
      <CardContent>
        <Typography variant="h6" className={styles.chartTitle}>
          Workout Frequency
        </Typography>
        <div className={styles.chartContainer}>
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutChart;
