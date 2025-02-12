"use client";

import DashboardBmi from "../bmiCard/dashboardBmi";
import ChallengeCounter from "../challengCounter/challengeCounter";

import ProfileBioCard from "../profileBioCard/profileBioCard";
import WorkoutChart from "../workoutChart/workoutchart";
import { Grid, Container } from "@mui/material";

export default function DashboardItems() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12}>
          <ProfileBioCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardBmi />
        </Grid>
        <Grid item xs={12} md={6}>
          <WorkoutChart />
        </Grid>

        <Grid item xs={12}>
          <ChallengeCounter />
        </Grid>
      </Grid>
    </Container>
  );
}
