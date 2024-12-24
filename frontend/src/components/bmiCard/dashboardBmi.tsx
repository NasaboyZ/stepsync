"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ChartOptions,
} from "chart.js";
import styles from "./dashboardBmi.module.css";

// Chart.js-Registrierung
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

// Typdefinition für BMI-Daten
interface BmiData {
  height: number;
  weight: number;
  bmi: number;
}

export default function DashboardBmi() {
  const [bmiData, setBmiData] = useState<BmiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchBmiData() {
      if (session?.accessToken) {
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/bmi`;
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || `Fehler: ${response.status}`);
            setLoading(false);
            return;
          }

          const data = await response.json();
          setBmiData([
            {
              height: data.height,
              weight: data.weight,
              bmi: data.bmi,
            },
          ]);
          setLoading(false);
        } catch (error) {
          console.error("Fehler beim Abrufen der Daten:", error);
          setError("Daten konnten nicht geladen werden");
          setLoading(false);
        }
      }
    }

    fetchBmiData();
  }, [session]);

  const chartData = {
    labels: bmiData.map((_, index) => `Messung ${index + 1}`),
    datasets: [
      {
        label: "BMI",
        data: bmiData.map((entry) => entry.bmi),
        borderColor: "rgba(0,0,0,9)",
        backgroundColor: "rgba(0,0,0,0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false, // Verhindert festes Seitenverhältnis
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        display: true,
        title: { display: true, text: "Messung (Index)" },
      },
      y: {
        display: true,
        title: { display: true, text: "BMI-Wert" },
        suggestedMin: 15,
        suggestedMax: 40,
      },
    },
  };

  if (loading) return <div>Lädt Daten...</div>;
  if (error) return <div>Fehler: {error}</div>;

  const chartHeight = `${Math.max(300, bmiData.length * 50)}px`;

  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography variant="h6" className={styles.title}>
          BMI Verlauf
        </Typography>
        <div
          className={styles.chartContainer}
          style={{ height: chartHeight }} // Dynamische Höhe
        >
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
