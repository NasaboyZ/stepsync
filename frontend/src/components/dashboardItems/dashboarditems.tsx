"use client";

import dynamic from "next/dynamic";
import { Box, Container } from "@mui/material";
import styles from "./dashboarditems.module.css";

{
  /* 
  alle Komponenten werden dynamisch geladen, da sie Browser-APIs verwenden.
  Render-Funktionen: Stellt das Dashboard-Layout mit den dynamischen Komponenten dar.
  "ssr: false" sorgt dafür, dass diese Komponenten nur im Client geladen werden.
  */
}

const DashboardBmi = dynamic(() => import("../bmiCard/dashboardBmi"), {
  ssr: false,
});
const ProfileBioCard = dynamic(
  () => import("../profileBioCard/profileBioCard"),
  {
    ssr: false,
  }
);
const WorkoutChart = dynamic(() => import("../workoutChart/workoutchart"), {
  ssr: false,
});
const ChallengeCounter = dynamic(
  () => import("../challengCounter/challengeCounter"),
  {
    ssr: false,
  }
);

{
  /*
 
  
  Return:
  - ProfileBioCard: Zeigt die Profilinformationen des Nutzers.
  - DashboardBmi: Stellt die BMI-Werte des Nutzers dar.
  - WorkoutChart: Visualisiert die absolvierten Workouts in einer Statistik.
  - ChallengeCounter: Zeigt die aktuellen Herausforderungen und Fortschritte.
*/
}

export default function DashboardItems() {
  return (
    <Container maxWidth="lg">
      <Box className={styles.dashboardContainer}>
        <Box className={styles.gridContainer}>
          <Box>
            <ProfileBioCard />
          </Box>
          <Box className={styles.twoColumnGrid}>
            <DashboardBmi />
            <WorkoutChart />
          </Box>
          <Box>
            <ChallengeCounter />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
