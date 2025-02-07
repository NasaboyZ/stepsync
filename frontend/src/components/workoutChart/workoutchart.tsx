"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography, MenuItem, Select } from "@mui/material";
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
  const [timeframe, setTimeframe] = useState("12_months");
  const [category, setCategory] = useState("all");

  const workoutData = {
    "7_days": [
      { day: "Mo", frequency: 2 },
      { day: "Di", frequency: 3 },
      { day: "Mi", frequency: 1 },
      { day: "Do", frequency: 2 },
      { day: "Fr", frequency: 4 },
      { day: "Sa", frequency: 1 },
      { day: "So", frequency: 3 },
    ],
    "12_months": [
      { month: "Jan", frequency: 5 },
      { month: "Feb", frequency: 3 },
      { month: "Mär", frequency: 4 },
      { month: "Apr", frequency: 3 },
      { month: "Mai", frequency: 8 },
      { month: "Jun", frequency: 16 },
      { month: "Jul", frequency: 13 },
    ],
    "5_years": [
      { year: "2021", frequency: 120 },
      { year: "2022", frequency: 135 },
      { year: "2023", frequency: 150 },
      { year: "2024", frequency: 140 },
      { year: "2025", frequency: 160 },
    ],
  };

  const selectedData = workoutData[timeframe];

  const chartData = {
    labels: selectedData.map((data) => Object.values(data)[0]),
    datasets: [
      {
        label: "Workout Häufigkeit",
        data: selectedData.map((data) => data.frequency),
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
        grid: { display: false },
        ticks: {
          color: "rgba(0, 0, 0, 0.6)",
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: { color: "rgba(0, 0, 0, 0.1)" },
        ticks: { color: "rgba(0, 0, 0, 0.6)" },
      },
    },
  };

  return (
    <Card className={styles.chartCard}>
      <CardContent>
        <Typography variant="h6" className={styles.chartTitle}>
          Workout-Häufigkeit
        </Typography>
        <div className={styles.filters}>
          <Select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <MenuItem value="7_days">Letzte 7 Tage</MenuItem>
            <MenuItem value="12_months">Letzte 12 Monate</MenuItem>
            <MenuItem value="5_years">Letzte 5 Jahre</MenuItem>
          </Select>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="all">Alle Workouts</MenuItem>
            <MenuItem value="krafttraining">Nur Krafttraining</MenuItem>
            <MenuItem value="cardio">Nur Cardio</MenuItem>
          </Select>
        </div>
        <div className={styles.chartContainer}>
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutChart;
