"use client";

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
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
import { fetchWorkoutStatistics } from "@/utils/api";
import { getSession } from "next-auth/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

const WorkoutChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState("12_months");
  const [category, setCategory] = useState("all");
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  {/* 
     returns:  useEffect-Hook zum Laden der Workout-Statistiken.
      - Kein direkter Rückgabewert, aktualisiert jedoch den `chartData`-State mit den geladenen Statistiken.
  */}
  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setLoading(true);
        setError(null);

        const session = await getSession();
        const token = session?.accessToken as string;

        if (!token) {
          setError("Bitte melden Sie sich an");
          return;
        }

        const statistics = await fetchWorkoutStatistics(token, {
          timeframe,
          category,
        });

        setChartData({
          labels: statistics.map((item) => item.date),
          datasets: [
            {
              label: "Workout Häufigkeit",
              data: statistics.map((item) => item.frequency),
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderColor: "rgba(0, 0, 0, 1)",
              borderWidth: 1,
              borderRadius: 5,
            },
          ],
        });
      } catch (err) {
        console.error("Fehler beim Laden der Statistiken:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Ein unerwarteter Fehler ist aufgetreten"
        );
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, [timeframe, category]);

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
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : chartData ? (
            <Bar data={chartData} options={options} />
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutChart;
