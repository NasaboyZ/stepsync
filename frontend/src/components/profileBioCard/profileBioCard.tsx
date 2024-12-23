"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import styles from "./profileBioCard.module.css";

interface UserProfile {
  username: string;
  age: number | null;
  sex: string;
  height: number;
  weight: number;
  goal: string;
}

export default function ProfileBioCard() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchUserProfile() {
      if (session?.accessToken) {
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`;
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
            },
          });

          const data = await response.json();
          console.log("API Response:", data); // Debugging
          setUserProfile({
            username: data.username,
            age: data.age,
            sex: data.gender,
            height: data.height,
            weight: data.weight,
            goal: data.goal,
          });
        } catch (error) {
          console.error("Fehler beim Laden des Benutzerprofils:", error);
        }
      }
    }

    fetchUserProfile();
  }, [session]);

  if (!userProfile) {
    // Render a loading state until userProfile is available
    return (
      <Typography variant="h6" align="center" style={{ marginTop: "2rem" }}>
        Loading user profile...
      </Typography>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={styles.bioCard}>
        <CardContent>
          <div className={styles.cardContent}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}></div>
            </div>

            <div className={styles.infoSection}>
              <Typography variant="h5" gutterBottom>
                {userProfile.username}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography color="textSecondary">Age</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {userProfile.age !== null
                      ? userProfile.age
                      : "No age provided"}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="textSecondary">Sex</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{userProfile.sex}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="textSecondary">Height</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {userProfile.height ? `${userProfile.height} cm` : "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="textSecondary">Weight</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {userProfile.weight ? `${userProfile.weight} kg` : "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="textSecondary">Goal</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{userProfile.goal}</Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
