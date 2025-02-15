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
  Filler,
} from "chart.js";
import Skeleton from "@mui/material/Skeleton";
import styles from "./dashboardBmi.module.css";
import { fetchBmiHistory, BmiHistoryData } from "@/utils/api";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler
);

export default function DashboardBmi() {
  const [bmiHistory, setBmiHistory] = useState<BmiHistoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  {
    /*
     returns:
      - Setzt `bmiHistory` mit den geladenen und sortierten Daten.
      - Falls ein Fehler auftritt, wird dieser im `error`-State gespeichert und `loading` deaktiviert.
    */
  }
  useEffect(() => {
    async function fetchData() {
      if (session?.accessToken) {
        try {
          const historyData = await fetchBmiHistory(session.accessToken);
          const sortedData = historyData.sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          );
          setBmiHistory(sortedData);
          setLoading(false);
        } catch (error) {
          console.error("Fehler beim Abrufen der BMI-Historie:", error);
          setError("BMI-Historie konnte nicht geladen werden");
          setLoading(false);
        }
      }
    }

    fetchData();
  }, [session]);

  const chartData = {
    labels: bmiHistory.map((entry) =>
      new Date(entry.created_at).toLocaleDateString("de-DE")
    ),
    datasets: [
      {
        label: "BMI",
        data: bmiHistory.map((entry) => entry.bmi_value),
        borderColor: "rgba(0, 0, 0, 1)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 5,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "rgba(0, 0, 0, 1)",
        pointBorderColor: "rgba(0, 0, 0, 1)",
        pointBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
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
        borderColor: "#00",
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
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 10,
          },
          autoSkip: true,
          maxTicksLimit: window.innerWidth < 640 ? 6 : 12,
        },
      },
      y: {
        display: true,
        grid: {
          color: "rgba(0, 0, 0, 0.6)",
        },
        ticks: {
          color: "rgba(0, 0, 0, 0.6)",
          font: {
            size: window.innerWidth < 640 ? 10 : 12,
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h6" className={styles.title}>
            <Skeleton variant="text" width="40%" height={30} />
          </Typography>
          <div className={styles.chartContainer} style={{ height: "300px" }}>
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) return <div>Fehler: {error}</div>;

  return (
    <Card className={styles.card} style={{ backgroundColor: "#8B8878" }}>
      <CardContent className={styles.cardContent}>
        <Typography
          variant="h6"
          className={styles.title}
          style={{ color: "white" }}
        >
          BMI Progress
        </Typography>
        <div className={styles.chartContainer}>
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
